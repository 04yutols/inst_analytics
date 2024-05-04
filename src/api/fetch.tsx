// api.ts
import axios from "axios";

export async function fetchPostedData() {
  try {
    const access_token =
      "EAAGeJ5q6nBcBO56Q2ab6ZBnIi4bol9R2Ypmo9jS6tWPZAldbdRPIA3mv5z7hwd2iEIjpThZBhj2RYP2QM3oZCJovhZBZBFeKqZBlHw15iJsCvw7oIOtSx9vW4Tt6Y3tvaX5lilY8yGiMlVCbIpSPZAXcZCEYFx8dlNnj5dV29vUXf8GVst9ZBcXqXNWFQuHj0lhlRbML6hZC0xo";
    const user_id = "17841465850618427";
    const res = await axios.get(
      `https://graph.facebook.com/v19.0/17843900656018477/top_media?user_id=${user_id}&fields=id%2Cmedia_type%2Cmedia_url%2Cchildren%7Bid%2Cmedia_type%2Cmedia_url%7D&access_token=${access_token}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
