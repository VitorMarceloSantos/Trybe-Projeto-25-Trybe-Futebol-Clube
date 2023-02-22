"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
const express = require("express");
const loginRoute_1 = require("./routes/loginRoute");
const teamRoute_1 = require("./routes/teamRoute");
const matchRoute_1 = require("./routes/matchRoute");
const leaderBoardRouteHome_1 = require("./routes/leaderBoardRouteHome");
const leaderBoardRouteAway_1 = require("./routes/leaderBoardRouteAway");
const leaderBoardRoute_1 = require("./routes/leaderBoardRoute");
class App {
    constructor() {
        this.app = express();
        this.config();
        // Não remover essa rota
        this.app.get('/', (req, res) => res.json({ ok: true }));
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(express.json());
        this.app.use(accessControl);
        this.app.use('/login', loginRoute_1.default);
        this.app.use('/teams', teamRoute_1.default);
        this.app.use('/matches', matchRoute_1.default);
        this.app.use('/leaderboard/home', leaderBoardRouteHome_1.default);
        this.app.use('/leaderboard/away', leaderBoardRouteAway_1.default);
        this.app.use('/leaderboard', leaderBoardRoute_1.default);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
}
exports.App = App;
// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
exports.app = new App().app;
//# sourceMappingURL=app.js.map