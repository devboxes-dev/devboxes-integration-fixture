#!/usr/bin/env node
import { formatTotal } from "../src/total.js";

console.log(formatTotal(Number(process.argv[2])));
