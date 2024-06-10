// api.ts
import axios from "axios";

export async function fetchMyselfData() {
  try {
    const access_token =
      "EAAGeJ5q6nBcBO56Q2ab6ZBnIi4bol9R2Ypmo9jS6tWPZAldbdRPIA3mv5z7hwd2iEIjpThZBhj2RYP2QM3oZCJovhZBZBFeKqZBlHw15iJsCvw7oIOtSx9vW4Tt6Y3tvaX5lilY8yGiMlVCbIpSPZAXcZCEYFx8dlNnj5dV29vUXf8GVst9ZBcXqXNWFQuHj0lhlRbML6hZC0xo";
    const user_id = "17841465850618427";
    const res = await axios.get(
      `https://graph.facebook.com/v20.0/17925404528869073/insights?metric=impressions,reach,video_views,likes&period=day&access_token=${access_token}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
