/* eslint-disable prettier/prettier */
import { ConfigModuleOptions } from "@nestjs/config";

export const configuration = () => ({
  port: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
}) as ConfigModuleOptions

export default configuration;