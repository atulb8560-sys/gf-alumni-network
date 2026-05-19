"use client"

import { useState, useEffect } from "react"
import Modal from "react-modal"
import { supabase } from "@/lib/supabase"

export default function Home() {

  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {

    if (!isVerified) {
      setOpen(true)
    }

  }, [isVerified])

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

        setOpen(false)

        setTimeout(() => {
          successBox.style.opacity = "1"
        }, 100)

        setTimeout(() => {
          successBox.style.opacity = "0"
        }, 1800)

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

      <Modal
        isOpen={open}
        onRequestClose={() => {}}
        ariaHideApp={false}
        style={{
          overlay: {
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(10px)",
            zIndex: 999999,
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
                    color: "#E63946"
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
                    ? "https://unsrekjwlfqdvqvvfukg.supabase.co/storage/v1/object/sign/Popup-Images/Register%20Icon.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTQ3ZDQyNS1kYjg2LTQ1ZjItOGE3NC00OGZiOGIxODY0ZjUiLCJhbGciOiJIUzI1NiJ9"
                    : "https://unsrekjwlfqdvqvvfukg.supabase.co/storage/v1/object/sign/Popup-Images/Login%20Icon.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTQ3ZDQyNS1kYjg2LTQ1ZjItOGE3NC00OGZiOGIxODY0ZjUiLCJhbGciOiJIUzI1NiJ9"
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
                      cursor: "pointer"
                    }}
                  >
                    ✏️ Register Here →
                  </button>

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
                      cursor: "pointer"
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