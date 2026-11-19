"""Convert the approved Word book into reader data without rewriting its text.

Usage: python scripts/prepare-pbat-book.py /path/to/book-folder
The folder must contain the matching final DOCX, PDF and cover designs.
"""
from pathlib import Path
import json
import re
import shutil
import sys
import zipfile
import xml.etree.ElementTree as ET

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'


def prepare(source, destination):
    destination.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(source / 'ROAD_TO_2027_RENEWED_HOPE_2.0.docx') as archive:
        body = ET.fromstring(archive.read('word/document.xml')).find(W + 'body')
        relationships = {
            item.get('Id'): item.get('Target')
            for item in ET.fromstring(archive.read('word/_rels/document.xml.rels'))
        }

    chapters = []
    chapter = None
    for paragraph in body:
        if paragraph.tag != W + 'p':
            continue
        style_element = paragraph.find('./' + W + 'pPr/' + W + 'pStyle')
        style = style_element.get(W + 'val') if style_element is not None else ''
        text = ''.join(node.text or '' for node in paragraph.iter(W + 't'))
        if style == 'SectionHeading':
            if text in ('Contents', 'Guide to the 100 Points'):
                chapter = None
                continue
            chapter_id = re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')
            chapter = {'id': chapter_id, 'title': text, 'blocks': []}
            chapters.append(chapter)
            continue
        if chapter is None or not text or not style:
            continue

        runs = []
        for child in paragraph:
            children = list(child) if child.tag == W + 'hyperlink' else [child]
            href = relationships.get(child.get(R + 'id'), '') if child.tag == W + 'hyperlink' else ''
            for run in children:
                if run.tag != W + 'r':
                    continue
                value = ''.join(
                    node.text or '' if node.tag == W + 't' else '\n' if node.tag == W + 'br' else '\t'
                    for node in run if node.tag in (W + 't', W + 'br', W + 'tab')
                )
                if not value:
                    continue
                item = {'text': value}
                props = run.find(W + 'rPr')
                if props is not None:
                    for name, prop in (('bold', 'b'), ('italic', 'i')):
                        element = props.find(W + prop)
                        if element is not None and element.get(W + 'val', '1') not in ('0', 'false', 'off'):
                            item[name] = True
                if href.startswith(('https://', 'http://')):
                    item['href'] = href
                runs.append(item)

        block = {'type': 'paragraph', 'text': text, 'runs': runs}
        point = re.match(r'^(\d+)\.', text) if style == 'PointHeading' else None
        source_ref = re.match(r'^(S\d{3})\s', text) if style == 'BookNote' else None
        if point:
            block.update(type='point', id='point-' + point[1], number=int(point[1]))
        elif style == 'CitizenBenefit':
            block['type'] = 'benefit'
        elif source_ref:
            block.update(type='source', id='source-' + source_ref[1].lower())
        elif style in ('BookSmall', 'BookNote'):
            block['type'] = 'note'
        chapter['blocks'].append(block)

    points = [block['number'] for chapter in chapters for block in chapter['blocks'] if block['type'] == 'point']
    assert points == list(range(1, 101)), 'Expected all 100 consecutive points'
    assert sum(block['type'] == 'benefit' for chapter in chapters for block in chapter['blocks']) == 100
    for chapter in chapters:
        numbers = [block['number'] for block in chapter['blocks'] if block['type'] == 'point']
        if numbers:
            chapter['range'] = f'Points {numbers[0]}–{numbers[-1]}'
        for i, block in enumerate(chapter['blocks']):
            if block['type'] == 'point':
                assert chapter['blocks'][i + 2]['type'] == 'benefit', f'Missing benefit after {block["id"]}'

    data = {'title': 'Road to 2027: Renewed Hope 2.0', 'edition': 'November 2026', 'chapters': chapters}
    (destination / 'book.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    shutil.copy2(source / 'ROAD_TO_2027_RENEWED_HOPE_2.0.pdf', destination / 'road-to-2027-renewed-hope-2.0.pdf')
    # Resize the approved artwork for the web; keep the PDF exactly as supplied.
    from PIL import Image
    for name in ('FRONT', 'BACK'):
        with Image.open(source / 'ROAD_TO_2027_COVER_DESIGNS' / f'{name}_COVER.png') as cover:
            cover.thumbnail((800, 1200))
            cover.convert('RGB').save(destination / f'{name.lower()}-cover.webp', 'WEBP', quality=88)
    print(f'Prepared {len(chapters)} chapters, {len(points)} points and 100 citizen benefits.')


if __name__ == '__main__':
    prepare(Path(sys.argv[1]), Path(__file__).resolve().parents[1] / 'public' / 'books' / 'pbat2-0')
