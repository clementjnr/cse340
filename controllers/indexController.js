const buildHomePage = (req, res) => {
    res.render("home", {
        title: "Home",
        message: "Welcome to our Community Service Directory."
    });
};

export {
    buildHomePage
};
