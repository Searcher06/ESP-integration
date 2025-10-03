import axios from "axios";
import { integrationModel } from "../models/integration.model.js";
export const integrateEsp = async (req, res, next) => {
  const { esp } = req.params;
  const { apiKey } = req.body;

  if (!apiKey) {
    res.status(400);
    throw new Error("API key is required!");
  }

  // prettier-ignore
  if(esp !== "mailChimp" && esp !== "getResponse"){
    res.status(400);
    throw new Error("Invalid email service provider!")
  }

  const integrationExists = await integrationModel.findOne({
    esp,
  });

  // Did this to prevent further integration of the same email service provider
  if (integrationExists) {
    res.status(400);
    throw new Error(`${esp} is already integrated`);
  }

  try {
    if (esp == "getResponse") {
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
    } else if (esp == "mailChimp") {
      const dc = apiKey.split("-")[1];
      const response = await axios.get(
        `https://${dc}.api.mailchimp.com/3.0/lists`,
        {
          auth: {
            username: "anything", // This is required but it can be anything
            password: apiKey,
          },
        }
      );

      // creating and saving integration in the DB
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
    }
  } catch (error) {
    next(error);
  }
};

export const getAllAudiences = async (req, res, next) => {
  const { esp } = req.params;

  // checking if the ESP name is valid
  // prettier-ignore
  if(esp !== "mailChimp" &&  esp !== "getResponse"){
    res.status(400);
    throw new Error("Invalid email service provider")
  }

  // checking if integration exists for this ESP
  // else throw a not found error
  const integrationExists = await integrationModel.findOne({ esp });
  if (!integrationExists) {
    res.status(404);
    throw new Error(
      `No integration found for ${esp}. Please connect your account first!`
    );
  }

  try {
    if (esp == "getResponse") {
      const response = await axios.get(
        "https://api.getresponse.com/v3/campaigns",
        {
          headers: { "X-Auth-Token": `api-key ${integrationExists.apiKey}` },
        }
      );

      res.status(200).json({
        success: true,
        provider: `${esp}`,
        lists: response.data,
      });
    } else if (esp == "mailChimp") {
      const dc = integrationExists.apiKey.split("-")[1]; // This is called the data centre it's part of the url
      const response = await axios.get(
        `https://${dc}.api.mailchimp.com/3.0/lists`,
        {
          auth: {
            username: "anything", // This is required but it can be anything
            password: integrationExists.apiKey,
          },
        }
      );
      res.status(200).json({
        success: true,
        provider: `${esp}`,
        lists: response.data,
      });
    }
  } catch (error) {
    next(error);
  }
};
