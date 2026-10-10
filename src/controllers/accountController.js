const buildDashboard = (req, res) => {
  res.render("dashboard", {
    title: "Dashboard"
  });
};


export {
  buildDashboard
};