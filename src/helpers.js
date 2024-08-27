/**
converts the first letter of a string to uppercase
*/
export function uppercaseFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
takes an array of arrays and flattens them into a single array
*/
export function flattenArray(arr) {
  return arr.reduce(function(a, b){
     return a.concat(b);
}, [])
}

/**
takes a URL hash and converts it to tag title
*/
export function formatHashAsTag(hash) {
  return hash
    .replace("#", "")
    .replace(/-/g, " ")
    .replace("front end", "front-end");
}

/**
takes a tag title and converts it to a URL slug
*/
export function formatTagAsSlug(tag) {
  return tag.replace(/\s/g, "-");
}

/**
custom time to read function, since the built-in one doesn't seem to work with vue-remark
*/
export function minutesToRead(content) {
  // get markdown content and remove import statements & headings
  const strippedContent = content
    .replace(`import BulletList from "~/components/BulletList"`, "")
    .replace(`import DefinitionList from "~/components/DefinitionList"`, "")
    .replace(/\#/g, "");

  // get the base word count
  let wordCount = strippedContent.split(" ").length;
  // time to read is the word count divided by the average number of words per minute (180)
  let timeToRead = wordCount / 180;

  // lists are parsed independently from the main markdown content, figure out how many we're using
  const definitionListCount = strippedContent.match(/DefinitionList/g) ? strippedContent.match(/DefinitionList/g).length : 0;
  const bulletListCount = strippedContent.match(/BulletList/g) ? strippedContent.match(/BulletList/g).length : 0;
  // we'll just assume each list will take a little over a minute to read
  timeToRead += (definitionListCount + bulletListCount) * 1.125;

  // round to the nearest integer and append the word minute(s)
  const roundedTimeToRead = Math.round(timeToRead);
  let minutesToRead = "1 minute";
  if (roundedTimeToRead >= 2) minutesToRead = `${roundedTimeToRead} minutes`;

  return minutesToRead;
}

/**
constructs twitter link from title, url, and hashtags
*/
export function generateTwitterLink(title, url, hashtags) {
  // error handling
  if (!title || !url) {
    console.log("missing `title` or `url` param in twitterLink()");
    return null;
  }
  // if we got hashtags, prepare to append 'em
  let andHashtags = "";
  if (hashtags) andHashtags = `&hashtags=${hashtags}`;
  // construct the link
  return `https://twitter.com/share?url=${url}&text=${title}&via=perpetualgrimac${andHashtags}`;
}

/**
just a list of spammy keywords
*/
export const spam = ["cannabis", "cryptocurrency", "frsdiev", "fkaakiev", "serien", "sport", "dariusror", "supreme", "are you in", "jeffreythoup", "sex", "williamrot", "fuck", "juicy", "woman", "in your town", "austinlipse", "sexy", "rih.co", "tebow", "cecilbeawn", "find yourself", "night in your city", "a girl", "win", "won", "iphone x", "wayneshevy", "biz", "danielpinia", "forex", "bitcoin", "joshuaskarp", "high potency", "chemist", "warehouse", "not a robot", "andrewvox", "learn how to earn", "stanleyexave", "how to generate", "high-quality traffic", "for your blog", "chicas", "sexys", "la noche", "tu pueblo", "arshon technology", "electronic product", "hello dear", "president message", "in below", "return on investment", "zreitev", "dating", "dissertation", "essay", "trust god", "postal contact info", "the falling away", "@mail.ru"];

/**
email validation
*/
export function isEmail(str) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!regex.test(str)) {
    return false;
  } else {
    return true;
  }
}
