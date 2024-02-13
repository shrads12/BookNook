import { onRequest } from "firebase-functions/v2/https";
const { server } = require("../dist/bundle");
import admin from "firebase-admin";

admin.initializeApp();

exports.booknook = onRequest(server);
