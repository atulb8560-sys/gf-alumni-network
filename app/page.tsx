"use client"

import { useState } from "react"
import Modal from "react-modal"
import { supabase } from "@/lib/supabase"

export default function Home() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  async function checkEmail() {

  if (!email) return

  setLoading(true)
  setError(false)

  const { data } = await supabase
    .from("User")
    .select("email")
    .eq("email", email)
    .single()

  if (data) {

    setLoading(true)

    setTimeout(() => {

      setLoading(false)

      const successBox = document.createElement("div")

      successBox.innerHTML = `
        <div style="
          display:flex;
          align-items:center;
          gap:14px;
        ">
          
          <!-- GREEN ICON -->

          <div style="
            width:48px;
            height:48px;
            min-width:48px;
            border-radius:50%;
            background:#22C55E;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:22px;
            color:white;
            font-weight:700;
            box-shadow:0 0 30px rgba(34, 197, 94, 0.22);
          ">
            ✓
          </div>

          <!-- TEXT -->

          <div style="
            display:flex;
            flex-direction:column;
          ">
            
            <div style="
              font-size:16px;
              font-weight:700;
              color:#0F172A;
              margin-bottom:3px;
            ">
              You’re all set!
            </div>

            <div style="
              font-size:13px;
              color:#667085;
              line-height:18px;
              max-width:240px;
            ">
              Dive in and explore the data.
            </div>

            

            </div>

          </div>

        </div>
      `

      successBox.style.position = "fixed"
      successBox.style.top = "50%"
      successBox.style.left = "50%"
      successBox.style.transform = "translate(-50%, -50%)"

      successBox.style.padding = "18px 22px"

      successBox.style.background =
        "linear-gradient(135deg, #F4FFF7, #EEF7F1)"

      successBox.style.border =
        "1px solid #A7E3BC"

      successBox.style.borderRadius = "22px"

      successBox.style.zIndex = "999999"

      successBox.style.boxShadow =
        "0 10px 30px rgba(15, 23, 42, 0.12)"

      successBox.style.opacity = "0"

      successBox.style.transition =
        "all 0.45s ease"

      successBox.style.backdropFilter =
        "blur(10px)"

      document.body.appendChild(successBox)

      // CLOSE POPUP
      setOpen(false)

      // SHOW TOAST
      setTimeout(() => {
        successBox.style.opacity = "1"
      }, 100)

      // HIDE TOAST
      setTimeout(() => {
        successBox.style.opacity = "0"
      }, 1800)

      // REMOVE TOAST + UNLOCK
      setTimeout(() => {
        document.body.removeChild(successBox)
        setIsVerified(true)
      }, 2300)

    }, 1200)

  } else {

    setLoading(false)
    setError(true)

  }
}

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "#fff",
        position: "relative",
        fontFamily: "Poppins, Inter, sans-serif"
      }}
    >
      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(0); }
            20% { transform: translateX(-5px); }
            40% { transform: translateX(5px); }
            60% { transform: translateX(-5px); }
            80% { transform: translateX(5px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>

      {/* POPUP */}

      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        ariaHideApp={false}
        style={{
          overlay: {
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(10px)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          },
          content: {
            border: "none",
            background: "transparent",
            inset: "unset",
            padding: 0,
            overflow: "visible"
          }
        }}
      >
        <div
          style={{
            position: "relative",
            width: "320px",
            height: "370px"
          }}
        >
          {/* BACK BLUE LAYER */}

          <div
            style={{
              position: "absolute",
              width: "310px",
              height: "425px",
              background: "linear-gradient(135deg, #1DA1F2, #00C2FF)",
              borderRadius: "32px",
              transform: "rotate(-8deg)",
              top: "-15px",
              left: "-5px",
              zIndex: 1
            }}
          />

          {/* MAIN POPUP */}

          <div
            style={{
              position: "absolute",
              width: "315px",
              height: "405px",
              background: "#FFFFFF",
              borderRadius: "15px",
              padding: "10px",
              zIndex: 2,
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              overflow: "hidden"
            }}
          >
            {/* CLOSE BUTTON */}

            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                border: "none",
                background: "#F2F2F2",
                color: "#4A4A4A",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              ×
            </button>

            {/* HEADING */}

            <div
              style={{
                textAlign: "center",
                fontWeight: 700,
                fontSize: "19px",
                lineHeight: "28px",
                color: "#0B132B",
                marginTop: "25px",
                marginBottom: "8px"
              }}
            >
              Unlock the Alumni Network
            </div>

            {/* SUBTITLE */}

            <div
              style={{
                marginBottom: "12px",
                textAlign: "center",
                padding: error ? "0 16px" : "0 18px"
              }}
            >
              {error ? (
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    lineHeight: "18px",
                    color: "#E63946",
                    animation: "shake 0.4s ease-in-out"
                  }}
                >
                  📋 Oops... seems you have not filled the form yet.
                  Please complete the registration form below.
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "12.5px",
                    fontWeight: 500,
                    lineHeight: "20px",
                    color: "#5B6170"
                  }}
                >
                  Connect, collaborate, and grow with fellows across India.
                </div>
              )}
            </div>

            {/* NETWORK ILLUSTRATION */}

            <div
              style={{
                width: "100%",
                height: "160px",
                borderRadius: "10px",
                overflow: "hidden",
                marginBottom: "-16px"
              }}
            >
              <img
                src={
                  error
                    ? "https://unsrekjwlfqdvqvvfukg.supabase.co/storage/v1/object/sign/Popup-Images/Register%20Icon.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTQ3ZDQyNS1kYjg2LTQ1ZjItOGE3NC00OGZiOGIxODY0ZjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3B1cC1JbWFnZXMvUmVnaXN0ZXIgSWNvbi5wbmciLCJpYXQiOjE3NzkwOTAzNDMsImV4cCI6MjA5NDQ1MDM0M30.pDIEykkVn8JHKevec-mhUYr1JSPr8SS_gqrWYMnZuGo"
                    : "https://unsrekjwlfqdvqvvfukg.supabase.co/storage/v1/object/sign/Popup-Images/Login%20Icon.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTQ3ZDQyNS1kYjg2LTQ1ZjItOGE3NC00OGZiOGIxODY0ZjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3B1cC1JbWFnZXMvTG9naW4gSWNvbi5wbmciLCJpYXQiOjE3NzkwODk3OTYsImV4cCI6MjA5NDQ0OTc5Nn0.KpZMe1v-5VgJLu-LphB_VFxsaca_Eo_eRxMnp4hQ-Gg"
                }
                alt="popup illustration"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px"
                }}
              />
            </div>

            {/* CTA BOX */}

            <div
              style={{
                background: "#F8FBFF",
                borderRadius: "20px",
                padding: "14px",
                marginTop: "4px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
              }}
            >
              {error ? (
  <div>
    <div
      style={{
        fontSize: "11px",
        color: "#666",
        lineHeight: "14px",
        textAlign: "center",
        marginBottom: "8px"
      }}
    >
      Filling this form takes less time than explaining fellowship to relatives 😵‍💫
    </div>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}
    >

      {/* REGISTER BUTTON */}

      <button
        onClick={() => {
          window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLScrHlKhI4cdCKpem6lV0dtp28CyOltLyYrkY78C3apC2V8Shg/viewform?usp=header",
            "_blank"
          )
        }}
        style={{
          width: "100%",
          height: "42px",
          border: "none",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #005BFF, #2F8CFF)",
          color: "#FFFFFF",
          fontSize: "14px",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 10px 20px rgba(0,91,255,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px"
        }}
      >
        ✏️ Register Here →
      </button>

      {/* LOGIN BUTTON */}

      <button
        onClick={() => {
          setError(false)
        }}
        style={{
          width: "100%",
          height: "30px",
          border: "none",
          background: "transparent",
          color: "#5B6170",
          fontSize: "11px",
          fontWeight: 600,
          cursor: "pointer"
        }}
      >
        Already registered? Login
      </button>

    </div>
  </div>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      height: "34px",
                      borderRadius: "10px",
                      border: "1px solid #DDE7F5",
                      padding: "0 10px",
                      fontSize: "11px",
                      marginBottom: "14px",
                      outline: "none"
                    }}
                  />

                  <button
                    onClick={checkEmail}
                    disabled={loading}
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "none",
                      borderRadius: "18px",
                      background: "linear-gradient(135deg, #005BFF, #2F8CFF)",
                      color: "#FFFFFF",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "0 10px 20px rgba(0,91,255,0.25)"
                    }}
                  >
                    {loading ? "Processing..." : "View Report"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* INVISIBLE BLOCK BUTTONS */}

      {!isVerified && (
        <>
          <button
            onClick={() => setOpen(true)}
            style={{
              position: "fixed",
              left: "93px",
              top: "156px",
              width: "134px",
              height: "28px",
              opacity: 0,
              zIndex: 9999,
              border: "none",
              background: "transparent",
              cursor: "pointer"
            }}
          />

          <button
            onClick={() => setOpen(true)}
            style={{
              position: "fixed",
              left: "93px",
              top: "195px",
              width: "134px",
              height: "28px",
              opacity: 0,
              zIndex: 9999,
              border: "none",
              background: "transparent",
              cursor: "pointer"
            }}
          />

          <button
            onClick={() => setOpen(true)}
            style={{
              position: "fixed",
              left: "93px",
              top: "234px",
              width: "134px",
              height: "28px",
              opacity: 0,
              zIndex: 9999,
              border: "none",
              background: "transparent",
              cursor: "pointer"
            }}
          />
          <button
            onClick={() => setOpen(true)}
            style={{
              position: "fixed",
              left: "93px",
              top: "312px",
              width: "134px",
              height: "28px",
              opacity: 0,
              zIndex: 9999,
              border: "none",
              background: "transparent",
              cursor: "pointer"
            }}
          />
          <button
            onClick={() => setOpen(true)}
            style={{
              position: "fixed",
              left: "93px",
              top: "350px",
              width: "134px",
              height: "28px",
              opacity: 0,
              zIndex: 9999,
              border: "none",
              background: "transparent",
              cursor: "pointer"
            }}
          />
          <button
            onClick={() => setOpen(true)}
            style={{
              position: "fixed",
              left: "93px",
              top: "385px",
              width: "134px",
              height: "28px",
              opacity: 0,
              zIndex: 9999,
              border: "none",
              background: "transparent",
              cursor: "pointer"
            }}
          />


          <button
            onClick={() => setOpen(true)}
            style={{
              position: "fixed",
              left: "93px",
              top: "272px",
              width: "134px",
              height: "28px",
              opacity: 0,
              zIndex: 9999,
              border: "none",
              background: "transparent",
              cursor: "pointer"
            }}
          />
        </>
      )}

      {/* POWER BI */}

      <iframe
        title="GF_India_Dashboard"
        src="https://app.powerbi.com/view?r=eyJrIjoiMDc2NzI3MDMtNjFjMS00NDQxLWI2OTMtYWRhZTU5NmI4ODRlIiwidCI6Ijk3MzgwNTFjLWFhNjMtNDJmOS1hNTJjLWI1N2ZlM2NjNzU3NSIsImMiOjEwfQ%3D%3D"
        style={{
          border: "none",
          width: "84vw",
          height: "84vh",
          transform: "scale(1.23)",
          transformOrigin: "top center"
        }}
        allowFullScreen
      ></iframe>
    </div>
  )
}