const EXECUTIVES = [
  { id:1,  name:'Engr. Kunle Oyediran',                  position:'State Coordinator',                        photo:'https://drive.google.com/thumbnail?id=19iMLodS2SB7uJUGJDQQAewsLFMJD6q3A&sz=w400', initials:'KO', rank:1  },
  { id:19, name:'Arakunrin Tobiloba Famurewa',            position:'Deputy State Coordinator',                 photo:'https://drive.google.com/thumbnail?id=1MCUIDHBcBJAQE0wPTlGD3QAfFl5PnKv8&sz=w400',  initials:'TF', rank:2  },
  { id:2,  name:'Alhaji Abdsalam Damola Mojeed',         position:'State Secretary',                          photo:'https://drive.google.com/thumbnail?id=1tLMm6xfAhJH1adm7jf8GTlvC3lRFMPP8&sz=w400',  initials:'AD', rank:3  },
  { id:4,  name:'Faleye Kazeem Oladele',                 position:'Director of Strategy',                     photo:'https://drive.google.com/thumbnail?id=1xrlPphHnJOZ9CsYjvBZcNNIGFMWz9rHS&sz=w400',  initials:'FK', rank:4  },
  { id:5,  name:'Alh. Mujeeb Adebimpe',                  position:'Director of Media / Spokesperson',         photo:'https://drive.google.com/thumbnail?id=1mBcdVRQvIHpiEdIfRMSgGOyI4K4ciqF_&sz=w400',  initials:'AM', rank:5  },
  { id:6,  name:'Ajibola Oluwasegun Mathew',             position:'Director of New Media',                    photo:'https://drive.google.com/thumbnail?id=11vsSPgPZ2pVJcDqfldZNgb2KfmmRt1dA&sz=w400',  initials:'AO', rank:6  },
  { id:20, name:'Hon. Muideen Abdulrasheed Romeo',        position:'Director of Finance',                      photo:'https://drive.google.com/thumbnail?id=1xydOalW67bKAexQPQIl5o3jW5_I2TnLN&sz=w400',  initials:'MA', rank:7  },
  { id:7,  name:'Olagunju Yussuf Olalekan',              position:'Director of Security and Protocol',        photo:'https://drive.google.com/thumbnail?id=1gu8QFcx9qVbEeDEB_-zyxt_aI2HLw0RN&sz=w400',  initials:'OY', rank:8  },
  { id:8,  name:'Araromi Olaoluwa Shadrack',             position:'Director of Faith & Community Engagement', photo:'https://drive.google.com/thumbnail?id=1N-9f4Ug4NxhzM43L5wzAWg6V1tQivoDY&sz=w400',  initials:'AO', rank:9  },
  { id:9,  name:'Adeolu Timothy Olanrewaju (Larry-Jay)', position:'Director of Students and Mobilization',   photo:'https://drive.google.com/thumbnail?id=1ytguHA9uHCAwjuI5vS3MlrHGeVis6nCh&sz=w400',  initials:'AT', rank:10 },
  { id:10, name:'Israel Olushola Akinloye',              position:'Director Contract and Mobilization',       photo:'https://drive.google.com/thumbnail?id=1e6jaFNmk4qa1sH6h3i6nowgh2uyvkpef&sz=w400',  initials:'IA', rank:10 },
  { id:11, name:'Hon. Jamiu Luqman Prince',              position:'Director Town Hall',                       photo:'https://drive.google.com/thumbnail?id=1-cVUacjGYOsMJnRv4VxD2htJs-chS_FH&sz=w400',  initials:'JL', rank:11 },
  { id:12, name:'Ogundare Monsurat Omolewa',             position:'Director Welfare and Event',               photo:'https://drive.google.com/thumbnail?id=1vp0CcJfPnQX5dBtsCpjqbMGffBp_k9um&sz=w400',  initials:'OM', rank:12 },
  { id:13, name:'Adejare Kehinde Ganiyu',                position:'Welfare Manager / Treasurer',              photo:'https://drive.google.com/thumbnail?id=1L2JF0kq8UnfyKK4YQ4txpuSD7MbpgmW_&sz=w400',  initials:'AK', rank:13 },
  { id:14, name:'Barr. Peter Adebayo',                   position:'Legal Adviser',                            photo:'https://drive.google.com/thumbnail?id=1TJLD2Kb8POLj0VYPPQJTJKkXo5OFqKN1&sz=w400',  initials:'PA', rank:14 },
  { id:15, name:'Hon. Kareem Taofeek Olanrewaju',        position:'Trustee',                                  photo:'https://drive.google.com/thumbnail?id=110EIzPn8FZR-tz9mJ9aNS4-LPHf252wS&sz=w400',  initials:'KT', rank:16 },
  { id:16, name:'Rasheed Ayotunde Jimoh',                position:'Head of Strategic Communication',          photo:'https://drive.google.com/thumbnail?id=123MIqHqoiV_CUFLNNv8sSP1tXL9Ddiyg&sz=w400',  initials:'RA', rank:17 },
  { id:17, name:'Hon. Olabode Oluwatobi Divine',         position:'Director Special Duties (Osun State)',     photo:'https://drive.google.com/thumbnail?id=1OAnYznSfBrJr1GF6-cPZ9H8ZY3lh2Th5&sz=w400',  initials:'OO', rank:18 },
  { id:18, name:'Adisa Ismail Adesola',                  position:'Director of Youth Mobilization',           photo:'https://drive.google.com/thumbnail?id=1W6XFkISWDCB9PZBq-tol_gg2Ur47rgE6&sz=w400',  initials:'AI', rank:19 },
]

const RTIFNLogo = ({ size = 44 }) => (
  <img src="/logo.jpeg" alt="RTIFN" style={{
    width: size, height: size, borderRadius: '50%',
    objectFit: 'cover', border: '2px solid white',
    flexShrink: 0,
  }} />
)

const APCLogo = ({ size = 44 }) => (
  <img src="/apc-logo.jpeg" alt="APC" style={{
    width: size, height: size, borderRadius: '6px',
    objectFit: 'cover', border: '2px solid rgba(255,255,255,0.4)',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)', flexShrink: 0,
  }} />
)

export default function ExecutivesPage() {
  const top3 = EXECUTIVES.filter(e => e.rank <= 3)
  const rest  = EXECUTIVES.filter(e => e.rank >  3)

  return (
    <div>
      <div className="page-banner">
        <p className="text-green-300 text-sm uppercase tracking-widest mb-2">Leadership</p>
        <h1 className="font-display text-4xl md:text-5xl text-white font-black">Meet Our Executives</h1>
        <p className="text-green-200 mt-3 max-w-2xl mx-auto">
          The dedicated leaders driving RTIFN Osun State Chapter's mission across all 30 local government areas.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <span className="section-label">Executive Council</span>
          <h2 className="section-title">State Chapter Leadership</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-green-600 to-yellow-500 mx-auto mt-4 rounded" />
        </div>

        {/* Top 3 */}
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:24, marginBottom:32 }}>
          {top3.map(exec => <ExecCard key={exec.id} exec={exec} large />)}
        </div>

        {/* Rest — all centered */}
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:24 }}>
          {rest.map(exec => <ExecCard key={exec.id} exec={exec} />)}
        </div>
      </div>
    </div>
  )
}

function ExecCard({ exec, large = false }) {
  const cardW  = large ? 280 : 240
  const photoH = large ? 200 : 170
  const logoSz = large ? 44  : 38

  return (
    <div style={{
      width: cardW,
      maxWidth: 'calc(100vw - 48px)',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0,80,0,0.25)',
      fontFamily: "'Source Sans 3', sans-serif",
    }}>
      <div style={{
        background: 'linear-gradient(160deg, #1a5c1a 0%, #2e8b2e 35%, #4caf4c 65%, #2e8b2e 85%, #1a5c1a 100%)',
        position: 'relative',
        paddingBottom: 14,
      }}>

        {/* Top logos bar */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 12px 6px' }}>
          <RTIFNLogo size={logoSz} />
          <APCLogo   size={logoSz} />
        </div>

        {/* Watermark */}
        <div style={{
          position:'absolute', top:'50%', left:'50%',
          transform:'translate(-50%, -50%) rotate(-20deg)',
          fontSize: large ? 38 : 32, fontWeight:900,
          color:'rgba(255,255,255,0.07)', whiteSpace:'nowrap',
          pointerEvents:'none', userSelect:'none', fontFamily:'serif', letterSpacing:2,
        }}>
          Osun State
        </div>

        {/* Photo box */}
        <div style={{
          margin:'4px auto 0',
          width: large ? 160 : 140,
          height: photoH,
          overflow:'hidden',
          borderRadius:'12px 12px 0 0',
          border:'3px solid rgba(255,255,255,0.3)',
          background:'rgba(0,60,0,0.4)',
          position:'relative',
        }}>
          {exec.photo && (
            <img
              src={exec.photo}
              alt={exec.name}
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', display:'block' }}
              onError={e => {
                e.target.style.display = 'none'
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'
              }}
            />
          )}
          {/* Initials fallback */}
          <div style={{
            display: exec.photo ? 'none' : 'flex',
            position:'absolute', inset:0,
            alignItems:'center', justifyContent:'center',
            fontSize:40, fontWeight:900, color:'rgba(255,255,255,0.5)', fontFamily:'serif',
          }}>
            {exec.initials}
          </div>
        </div>

        {/* Name ribbon */}
        <div style={{
          background:'linear-gradient(90deg, #0a3d0a, #1a5c1a, #0a3d0a)',
          border:'1px solid rgba(218,165,32,0.4)',
          margin:'8px 10px 0', borderRadius:6,
          padding:'7px 22px', textAlign:'center',
          boxShadow:'0 2px 8px rgba(0,0,0,0.3)', position:'relative',
        }}>
          <span style={{ position:'absolute', left:6, top:'50%', transform:'translateY(-50%)', color:'rgba(218,165,32,0.6)', fontSize:12 }}>❧</span>
          <span style={{ position:'absolute', right:6, top:'50%', transform:'translateY(-50%)', color:'rgba(218,165,32,0.6)', fontSize:12 }}>❧</span>
          <div style={{
            color:'white', fontSize: large ? 14 : 12.5, fontWeight:700,
            letterSpacing:0.3, fontFamily:"'Playfair Display', serif",
          }}>
            {exec.name}
          </div>
        </div>

        {/* Osun State label */}
        <div style={{
          textAlign:'center', color:'#f0f0f0',
          fontSize: large ? 17 : 15, fontWeight:900,
          letterSpacing:2, textTransform:'uppercase',
          marginTop:6, textShadow:'0 1px 4px rgba(0,0,0,0.4)',
        }}>
          OSUN STATE
        </div>

        {/* Position in gold */}
        <div style={{ textAlign:'center', padding:'2px 12px' }}>
          <div style={{
            color:'#FFD700', fontSize: large ? 12 : 11,
            fontWeight:900, textTransform:'uppercase',
            letterSpacing:0.8, lineHeight:1.3,
            textShadow:'0 1px 3px rgba(0,0,0,0.5)',
          }}>
            {exec.position}
          </div>
        </div>

        {/* RTIFN label */}
        <div style={{
          textAlign:'center', padding:'5px 10px 2px',
          borderTop:'1px solid rgba(255,255,255,0.15)', marginTop:6,
        }}>
          <div style={{ color:'rgba(255,255,255,0.9)', fontSize:10, fontWeight:700, letterSpacing:0.5, textTransform:'uppercase' }}>
            RTIFN
          </div>
          <div style={{ color:'rgba(255,255,255,0.75)', fontSize:9, letterSpacing:0.3 }}>
            (RELAX TINUBU IS FIXING NIGERIA)
          </div>
        </div>

        {/* Tagline */}
        <div style={{
          textAlign:'center', color:'rgba(255,255,255,0.65)',
          fontSize:9, fontStyle:'italic', letterSpacing:1, paddingBottom:10, marginTop:2,
        }}>
          from promises to progress!!!
        </div>

      </div>
    </div>
  )
}
