import axios from "axios";
import { integrationModel } from "../models/integration.model.js";
export const saveApiKey = async (req, res, next) => {
  const { esp } = req.params;
  const { apiKey } = req.body;

  if (!apiKey) {
    res.status(400);
    throw new Error("API key is required!");
  }

  // prettier-ignore
  if(esp !== "mailchimp" && esp !== "mailChimp" &&  esp !== "getresponse" && esp !== "getResponse"){
    res.status(400);
    throw new Error("Invalid Esp name!")
  }

  if (esp == "getResponse" || esp == "getresponse") {
    const integrationExists = await integrationModel.findOne({
      apiKey,
      esp,
      status: "connected",
    });

    if (integrationExists) {
      res.status(400);
      throw new Error("Already integrated with this API key and ESP");
    }

    try {
      const response = await axios.get(
        "https://api.getresponse.com/v3/campaigns",
        {
          headers: { "X-Auth-Token": `api-key ${apiKey}` },
        }
      );
      const integration = await integrationModel.create({
        esp,
        apiKey,
        status: "connected",
      });

      res.status(201).json({
        success: true,
        message: `Integration with ${esp} connected successfully`,
        provider: `${esp}`,
        status: integration.status,
      });
    } catch (error) {
      next(error);
    }
  }
};
export const getAllAudiences = async (req, res) => {
  res.status(200).send("Get all audiences");
};
