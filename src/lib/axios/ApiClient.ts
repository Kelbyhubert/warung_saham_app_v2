import axios from "axios";
import { config } from "./Config";

export const ApiClient = axios.create(config);