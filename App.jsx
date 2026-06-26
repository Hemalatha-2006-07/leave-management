import React, { useState } from "react";

function App() {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      employee: "Hemalatha",
      type: "Sick Leave",
      from: "2026-06-20",
      to: "2026-06-22",
      reason: "Health Issue",
      status: "Approved",
    },
  ]);

  const [formData, setFormData] = useState({
    employee: "",
    type: "",
    from: "",
    to: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const applyLeave = (e) => {
    e.preventDefault();

    const newLeave = {
      id: Date.now(),
      ...formData,
      status: "Pending",
    };

    setLeaves([...leaves, newLeave]);

    setFormData({
      employee: "",
      type: "",
      from: "",
      to: "",
      reason: "",
    });
  };

  const updateStatus = (id, status) => {
    setLeaves(
      leaves.map((leave) =>
        leave.id === id ? { ...leave, status } : leave
      )
    );
  };

  const styles = {
    app: {
      background: "#f5f7fb",
      minHeight: "100vh",
      fontFamily: "Segoe UI, sans-serif",
    },

    header: {
      background: "linear-gradient(135deg,#6a11cb,#2575fc)",
      color: "white",
      textAlign: "center",
      padding: "20px",
    },

    dashboard: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
      gap: "20px",
      padding: "20px",
    },

    card: {
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    },

    container: {
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      gap: "20px",
      padding: "20px",
    },

    section: {
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    },

    input: {
      width: "100%",
      padding: "10px",
      marginTop: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
    },

    button: {
      width: "100%",
      marginTop: "15px",
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      background: "#6a11cb",
      color: "white",
      cursor: "pointer",
      fontSize: "16px",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "15px",
    },

    th: {
      background: "#6a11cb",
      color: "white",
      padding: "10px",
      border: "1px solid #ddd",
    },

    td: {
      padding: "10px",
      border: "1px solid #ddd",
      textAlign: "center",
    },

    approve: {
      background: "green",
      color: "white",
      border: "none",
      padding: "8px 12px",
      marginRight: "5px",
      borderRadius: "5px",
      cursor: "pointer",
    },

    reject: {
      background: "red",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Rejected":
        return "red";
      default:
        return "orange";
    }
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1>🏢 HR Leave Management System</h1>
        <p>Employee Leave Tracking & Approval Dashboard</p>
      </header>

      <div style={styles.dashboard}>
        <div style={styles.card}>
          <h3>Total Requests</h3>
          <h2>{leaves.length}</h2>
        </div>

        <div style={styles.card}>
          <h3>Approved</h3>
          <h2>
            {leaves.filter((leave) => leave.status === "Approved").length}
          </h2>
        </div>

        <div style={styles.card}>
          <h3>Pending</h3>
          <h2>
            {leaves.filter((leave) => leave.status === "Pending").length}
          </h2>
        </div>

        <div style={styles.card}>
          <h3>Rejected</h3>
          <h2>
            {leaves.filter((leave) => leave.status === "Rejected").length}
          </h2>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.section}>
          <h2>📝 Apply Leave</h2>

          <form onSubmit={applyLeave}>
            <input
              style={styles.input}
              type="text"
              name="employee"
              placeholder="Employee Name"
              value={formData.employee}
              onChange={handleChange}
              required
            />

            <select
              style={styles.input}
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Leave Type</option>
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Vacation Leave</option>
            </select>

            <input
              style={styles.input}
              type="date"
              name="from"
              value={formData.from}
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              type="date"
              name="to"
              value={formData.to}
              onChange={handleChange}
              required
            />

            <textarea
              style={styles.input}
              name="reason"
              placeholder="Reason for Leave"
              value={formData.reason}
              onChange={handleChange}
              required
            />

            <button style={styles.button} type="submit">
              Submit Leave Request
            </button>
          </form>
        </div>

        <div style={styles.section}>
          <h2>📋 Leave Requests</h2>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Employee</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>From</th>
                <th style={styles.th}>To</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td style={styles.td}>{leave.employee}</td>
                  <td style={styles.td}>{leave.type}</td>
                  <td style={styles.td}>{leave.from}</td>
                  <td style={styles.td}>{leave.to}</td>

                  <td style={styles.td}>
                    <span
                      style={{
                        background: getStatusColor(leave.status),
                        color: "white",
                        padding: "5px 12px",
                        borderRadius: "20px",
                      }}
                    >
                      {leave.status}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <button
                      style={styles.approve}
                      onClick={() =>
                        updateStatus(leave.id, "Approved")
                      }
                    >
                      Approve
                    </button>

                    <button
                      style={styles.reject}
                      onClick={() =>
                        updateStatus(leave.id, "Rejected")
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
                  