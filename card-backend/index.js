const app = require("./app");
const config = require("./utils/config");

const logger = require("./utils/logger");

// let cards = [
//   {
//     id: 1,
//     company: "Topps",
//     description: "Curry rookie Card",
//     notes: "Autographed",
//     service: "Super Express",
//     status: "Pending",
//   },
//   {
//     id: 2,
//     company: "Fleer",
//     description: "Durant rookie Card",
//     notes: null,
//     service: "Express",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     company: "Panini",
//     description: "Doncic rookie Card",
//     notes: "Autographed",
//     service: "Walk Through",
//     status: "Pending",
//   },
//   {
//     company: "Topps",
//     description: "LeBron Card",
//     notes: null,
//     service: "Walk-through",
//     status: "Pending",
//     id: 4,
//   },
// ];

// const generateId = () => {
//   const maxId = cards.length > 0 ? Math.max(...cards.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
