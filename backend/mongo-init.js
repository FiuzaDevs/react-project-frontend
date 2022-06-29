db.createUser(
    {
        user: "admin",
        pwd: "Passw0rd",
        roles: [
            {
                role: "root",
                db: "admin"
            }
        ]
    }
);