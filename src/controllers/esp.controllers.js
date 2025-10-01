export const saveApiKey = async (req, res) => {
  const { esp, apiKey } = req.body;

  if(esp !== "mailchimp" || )
  res.status(200).send("Validate and save API key");
};
export const getAllAudiences = async (req, res) => {
  res.status(200).send("Get all audiences");
};
