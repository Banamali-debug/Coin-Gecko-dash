import { Link } from "react-router";

export default function NotfoundPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.tittle}>404</h1>
      <p style={styles.message}>
        Oops ! The page you are looking for doesn't exist
      </p>
      <Link to="/" style={styles.link}>
        ⬅️ Go back to home
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "80px 20px",
    color: "#fff",
  },
  tittle: {
    fontSize: "72px",
    marginBottom: "20px",
  },
  message: {
    fontSize: "18px",
    marginBottom: "30px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
};
