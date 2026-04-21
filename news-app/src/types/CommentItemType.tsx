/*
Example:

  {
    "by": "ymolodtsov",
    "id": 47839384,
    "parent": 47836730,
    "text": "Comparing digital ads to the Stasi is just peak Western snowflake behavior, I&#x27;m sorry.<p>There are many imaginary arguments about harm in the article, with precisely zero actual examples or cases. Data brokers, buy data, stalk somebody. Can you share at least something? No, it&#x27;s all just hand waving. Because none of these people can offer any. The fact that the author still thinks Cambridge Analytica meant something says a lot as well. This was a scandal out of nothing.<p>I, for one, am extremely grateful that, as I was growing up with not much money, I was still able to access more or less the same Internet as people in the US. I don&#x27;t care about a black-box algorithm looking at my habits to figure out that I love backpacks and microbrand watches, especially if it enables free platforms for me.<p>Stasi didn&#x27;t watch you to sell your crap online, you know. They had much worse motives.<p>If anything, we&#x27;re now going backward because of the enormous marginal costs of inference. With AI, people aren&#x27;t on the same page (even a $20 subscription is a lot of money in many countries).",   
    "time": 1776713509,
    "type": "comment"
  }
*/

type CommentItemType = {
  by: string;
  id: number;
  parent: number;
  text: string;
  time: number;
  type: "comment";
};

export type { CommentItemType };
