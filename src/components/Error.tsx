import React from "react"

type ErrorProps = {
  message?: string
}

const Errory: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div
      style={{
        padding: "1rem",
        margin: "1rem 0",
        border: "1px solid red",
        borderRadius: "5px",
        backgroundColor: "#ffe6e6",
        color: "#cc0000",
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {message || "Something went wrong!"}
    </div>
  )
}

export default Errory
