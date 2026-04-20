import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { NewsItemType } from "@/types/NewsItemType";
import { router } from "expo-router";

const NewsCard = ({ newsItem }: { newsItem: NewsItemType }) => {
  const colors = useColors();
  if (!newsItem) {
    return null;
  }

  /*
  useEffect(() => {
    console.log("NewsCard rendered for id:", newsItem.id);
    return () => {
      console.log("NewsCard unmounted for id:", newsItem.id);
    };
  }, [newsItem.id]);*/

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );
    if (diffInHours < 1) return "just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <TouchableOpacity
      className="p-4 m-2 rounded-lg shadow-sm"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      onPress={() => {
        // Handle press, e.g., open URL
        //console.log("Open URL:", newsItem.url);
        router.push(`/news/${newsItem.id}`);
      }}
    >
      <Text
        className="text-lg font-bold mb-2 leading-6"
        style={{ color: colors.text }}
      >
        {newsItem.title}
      </Text>
      <View className="flex-row justify-between items-center">
        <Text className="text-sm" style={{ color: colors.textSecondary }}>
          by {newsItem.by}
        </Text>
        <View className="flex-row items-center">
          <Text
            className="text-sm mr-2"
            style={{ color: colors.textSecondary }}
          >
            {newsItem.score} points
          </Text>
          <Text className="text-sm" style={{ color: colors.textSecondary }}>
            {formatTime(newsItem.time)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;

/*

[
  {
    "by": "Lerc",
    "id": 47839081,
    "kids": [
      47839910
    ],
    "parent": 47836730,
    "text": "I once watched a news report about the then tail end of the Ceaușescu regime.  One of the indicators of the level of oppression they described was that they had video cameras mounted on street lamps.",
    "time": 1776712081,
    "type": "comment"
  },
  {
    "by": "seydor",
    "id": 47839167,
    "kids": [
      47839707,
      47839503
    ],
    "parent": 47836730,
    "text": "Militarism, surveillance, propaganda, statism. Reminds me of something. Are we the baddies now ?",
    "time": 1776712489,
    "type": "comment"
  },
  {
    "by": "_doctor_love",
    "id": 47837589,
    "kids": [
      47838370,
      47838775,
      47838794,
      47837726,
      47838392,
      47839178,
      47838247
    ],
    "parent": 47836730,
    "text": "This is all well and good but as long as advertising is how folks make money on the web, the surveillance state will persist.",
    "time": 1776705783,
    "type": "comment"
  },
  {
    "by": "raincole",
    "id": 47839466,
    "parent": 47836730,
    "text": "I think this blog won the most unserious design of the year.",
    "time": 1776713874,
    "type": "comment"
  },
  {
    "by": "rapnie",
    "id": 47837399,
    "parent": 47836730,
    "text": "Blog got the hug of death, I think. Archive link: <a href=\"https:&#x2F;&#x2F;archive.is&#x2F;bpNAw\" rel=\"nofollow\">https:&#x2F;&#x2F;archive.is&#x2F;bpNAw</a>",
    "time": 1776705212,
    "type": "comment"
  },
  {
    "by": "inventor7777",
    "id": 47837325,
    "kids": [
      47838017,
      47838851,
      47837659,
      47838123,
      47837475
    ],
    "parent": 47836730,
    "text": "When Apple first released App Tracking Transparency, I immediately used it to block the trackers and I have not even thought about it since because it is so simple and useful.<p>What a contrast to modern websites which require all sorts of weird clicking gymnastics to disable similar tracking.",
    "time": 1776704977,
    "type": "comment"
  },
  {
    "by": "nickandbro",
    "id": 47836997,
    "kids": [
      47837080,
      47839550,
      47837833,
      47837234,
      47837409
    ],
    "parent": 47836730,
    "text": "Whenever I read your articles, I get distracted by the space invaders and just play that instead. Maybe this is a problem with me being a bit ADHD, but I feel like I am not the only one",
    "time": 1776703871,
    "type": "comment"
  },
  {
    "by": "righthand",
    "id": 47837106,
    "kids": [
      47837310
    ],
    "parent": 47836730,
    "text": "WHATWG wants to co-mingle document rendering with javascript (this is the real reason they are removing XSLT and not proposing a replacement, it skirts this enforcement) so that when you try to disable javascript or block tracking it breaks the document rendering, leaving the only option to leave Javascript enabled and ad blockers off. Other protocols gemini, gopher etc don’t have the same issues because they’re already excluding Javascript.<p>What is really needed is a hard fork of major browsers by a grass roots community to advance HTML standards to include partial template rendering solutions without the reliance on Javascript.<p>Of course this is a startup forum so the response is just going to be wittled down to observations about economic value. However if users start to change&#x2F;fight then the economics will too.",
    "time": 1776704232,
    "type": "comment"
  },
  {
    "by": "shevy-java",
    "id": 47838707,
    "parent": 47836730,
    "text": "I wanted to read, but my cursor was a hungry monster\nand so I chased after things to eat. After I played\nthis for a while I had to close the tab. I think if\nyou have something to say, having a cursor with an\nanimation is a bad idea. It distracts from the content.",
    "time": 1776710417,
    "type": "comment"
  },
  {
    "by": "morphle",
    "id": 47837397,
    "kids": [
      47837705
    ],
    "parent": 47836730,
    "text": "Page does not load in Safari and Chrome for various reasons",
    "time": 1776705209,
    "type": "comment"
  },
  {
    "by": "verisimi",
    "id": 47838570,
    "parent": 47836730,
    "text": "My opinion (probably an unpopular one) is that tracking for advertising is merely the <i>excuse</i> to justify widespread surveillance.  I don&#x27;t think all the advertising revenue that is purported to be in play stacks up.  I personally do not think advertising directs my purchasing.  I don&#x27;t think it directs others either.<p>I get that this is Google&#x27;s business, but perhaps a large amount of their &#x27;business&#x27; is actually from the government system (directly or indirectly) - they merely have to pretend to be running an advertising business.<p>I&#x27;m saying that the whole point of advertising was surveillance from the beginning.",
    "time": 1776709712,
    "type": "comment"
  },
  {
    "by": "incomingpain",
    "id": 47837929,
    "kids": [
      47838295
    ],
    "parent": 47836730,
    "text": "The government is going to surveil. That&#x27;s not going to change.<p>It&#x27;s whether or not warrantless searches are admissible; and they generally arent.",
    "time": 1776707039,
    "type": "comment"
  },
  {
    "by": "dataflow",
    "id": 47837887,
    "kids": [
      47838520
    ],
    "parent": 47836730,
    "text": "Sorry to nitpick but tracking and surveillance are not the same thing. Go back to the last century for a second, before all this 21st-century tech came along. Just because your cell phone and towers would be able to track what rough region (let&#x27;s call it &quot;site&quot;) you were visiting, that doesn&#x27;t mean they were surveilling you.<p>Surveillance implies things about bith intended usage and actual usage, etc. that -- simply put -- do not need to hold when you&#x27;re tracking something. If the argument is genuinely that cookies have genuinely been used to place us under <i>surveillance</i> rather than mere tracking -- I have nothing inherently against it, but you need to support it with evidence. Simply pointing to the fact that they track some fact or metric that indirectly relates to you is not sufficient evidence of that.<p>And to be clear, I&#x27;m not saying I like tracking or we should be fine with it. I hate it too. But it&#x27;s also a turnoff seeing people smearing one thing as another, and I don&#x27;t think it&#x27;s a great strategy to help win support for your cause.",
    "time": 1776706900,
    "type": "comment"
  },
  {
    "by": "taurath",
    "id": 47838030,
    "parent": 47836730,
    "text": "We did not - going to a website nowadays is akin to booting your grandma’s windows 95 PC - popups everywhere, banzai buddy, 20 toolbars, just utterly virus laden filth. The web is a place that used to have amazing views but it’s now only filled with billboards. Someday a new set of internets will come up and they’ll be good - it’s not expensive to make things good, it just needs to not be borne of utter libertarian zero-social-contract profit seeking.<p>Hell, I was shopping for furniture yesterday, and I swear all the popups even with ad blockers were there to prevent me from buying things. It doesn’t seem to be helpful for the stated goal.",
    "time": 1776707456,
    "type": "comment"
  },
  {
    "by": "bakugo",
    "id": 47837116,
    "kids": [
      47837154,
      47837239
    ],
    "parent": 47836730,
    "text": "The irony of using AI to generate an article on this topic...",
    "time": 1776704255,
    "type": "comment"
  },
  {
    "by": "anovikov",
    "id": 47838038,
    "kids": [
      47838595
    ],
    "parent": 47836730,
    "text": "Well, ever since the ads i see on iPhone Safari are utterly irrelevant bullshit because tracking there is crippled. Was 1996 88x31 banners world that just advertised random stuff, better than what we have today? They gave websites less money taking more space and annoyed users more.",
    "time": 1776707484,
    "type": "comment"
  },
  {
    "by": "gooseyGander",
    "dead": true,
    "id": 47839386,
    "parent": 47836730,
    "text": "[dead]",
    "time": 1776713528,
    "type": "comment"
  },
  {
    "by": "throwaway27448",
    "dead": true,
    "id": 47838003,
    "parent": 47836730,
    "text": "[dead]",
    "time": 1776707348,
    "type": "comment"
  },
  {
    "by": "ymolodtsov",
    "id": 47839384,
    "parent": 47836730,
    "text": "Comparing digital ads to the Stasi is just peak Western snowflake behavior, I&#x27;m sorry.<p>There are many imaginary arguments about harm in the article, with precisely zero actual examples or cases. Data brokers, buy data, stalk somebody. Can you share at least something? No, it&#x27;s all just hand waving. Because none of these people can offer any. The fact that the author still thinks Cambridge Analytica meant something says a lot as well. This was a scandal out of nothing.<p>I, for one, am extremely grateful that, as I was growing up with not much money, I was still able to access more or less the same Internet as people in the US. I don&#x27;t care about a black-box algorithm looking at my habits to figure out that I love backpacks and microbrand watches, especially if it enables free platforms for me.<p>Stasi didn&#x27;t watch you to sell your crap online, you know. They had much worse motives.<p>If anything, we&#x27;re now going backward because of the enormous marginal costs of inference. With AI, people aren&#x27;t on the same page (even a $20 subscription is a lot of money in many countries).",   
    "time": 1776713509,
    "type": "comment"
  }
]
*/
