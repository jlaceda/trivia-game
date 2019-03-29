"use strict";

// the clues
// http://www.j-archive.com/showgame.php?game_id=5454
let moneymoneymoney =
{
	name: "money, money, money",
	clues:
	[
		{
			value: 200,
			answer: "The name of this British monetary unit comes from a unit of weight",
			responses: [
				"kilogram",
				"farthing",
				"pound",
				"quid",
			],
			question: "pound",
			used: false,
			correct: false,
		},
		{
			value: 400,
			answer: "From 1792 to 1873 the U.S. issued silver 5-cent coins called not nickels but 'half' these",
			responses: [
				"quarter",
				"dollar",
				"nickel",
				"dime",
			],
			question: "dime",
			used: false,
			correct: false,
		},
		{
			value: 600,
			answer: "The Lincoln Memorial is on the back of this U.S. bill",
			responses: [
				"$100",
				"$50",
				"$10",
				"$5",
			],
			question: "$5",
			used: false,
			correct: false,
		},
		{
			value: 800,
			answer: "A silver tetradrachm from the 300s B.C. features a great portrait of him",
			responses: [
				"Apollo",
				"Ptolemy",
				"Alexander the Great",
				"Pyrrhus of Epirus",
			],
			question: "Alexander the Great",
			used: false,
			correct: false,
		},
		{
			value: 1000,
			answer: "English settlers in the New World used this word from Algonquian for beads used as Indian money",
			responses: [
				"pence",
				"wampum",
				"roenoke",
				"doubloon",
			],
			question: "wampum",
			used: false,
			correct: false,
		}
	]
};

let weregoingtothemovies = 
{
	name: "we're going to the movies",
	clues:
	[
		{
			value: 200,
			answer: "My favorite part of going is watching the previews called these, like something a car pulls",
			responses: [
				"camper",
				"literalize",
				"trailers",
				"screening",
			],
			question: "trailers",
			used: false,
			correct: false,
		},
		{
			value: 400,
			answer: "I love this format that gives \"up to 40% more image\" & \"highest quality 3D\"",
			responses: [
				"4K",
				"IMAX",
				"3D",
				"BluRay",
			],
			question: "IMAX",
			used: false,
			correct: false,
		},
		{
			value: 600,
			answer: "The ticket guy knows me, so I'm front row center for this 2016 monster movie sequel with an address for a title",
			responses: [
				"10 Cloverfield Lane",
				"Wolf on Wall Street",
				"21 Jump Street",
				"A Nightmare on Elm Street",
			],
			question: "10 Cloverfield Lane",
			used: false,
			correct: false,
		},
		{
			value: 800,
			answer: "I scream, you scream for these bite-sized chocolate-covered ice cream treats with a double talk name",
			responses: [
				"Mike and Ikes",
				"Tutti Fruitti",
				"BonBons",
				"Jujyfruits",
			],
			question: "BonBons",
			used: false,
			correct: false,
		},
		{
			value: 1000,
			answer: "Before we go, we should check out the ratings on this website that sounds like something you throw at a bad film",
			responses: [
				"IMDB",
				"Popcorn",
				"Metacritic",
				"Rotten Tomatoes",
			],
			question: "Rotten Tomatoes",
			used: false,
			correct: false,
		}
	]
};

let thechroniclesofnarnia = 
{
	name: "the chronicles of narnia",
	clues:
	[
		{
			value: 200,
			answer: "He's the title lion in \"The Lion, the Witch and the Wardrobe\", the first Narnia book",
			responses: [
				"Leo",
				"Aslan",
				"Mufasa",
				"Aslion",
			],
			question: "Aslan",
			used: false,
			correct: false,
		},
		{
			value: 400,
			answer: "Miraz, the king of Narnia, is the uncle of this title royal of the second book in the series",
			responses: [
				"Edmund Pevensie",
				"Lord Glozelle",
				"Prince Caspian",
				"Queen Jadis",
			],
			question: "Prince Caspian",
			used: false,
			correct: false,
		},
		{
			value: 600,
			answer: "In the fifth book of the chronicles, Bree, a talking one of these, and a boy named Shasta ride to Narnia",
			responses: [
				"A horse",
				"A mouse",
				"An elephant",
				"A goat",
			],
			question: "A horse",
			used: false,
			correct: false,
		},
		{
			value: 800,
			answer: "Digory is the title relative of this sixth book that also features his \"enchanting\" uncle Andrew",
			responses: [
				"The Royal Heir",
				"The Lightning Thief",
				"The Magicians Nephew",
				"The Alchemist",
			],
			question: "The Magicians Nephew",
			used: false,
			correct: false,
		},
		{
			value: 1000,
			answer: "\"Farewell to Shadowlands\" is the last chapter of this seventh & \"Last\" book in the chronicles",
			responses: [
				"The Deathly Hallows",
				"The Horse and His Boy",
				"The Last Battle",
				"The Silver Chair",
			],
			question: "The Last Battle",
			used: false,
			correct: false,
		},
	]
};

let scienceguys = 
{
	name: "science guys",
	clues:
	[
		{
			value: 200,
			answer: "This Austrian monk found pairs of genes separate in a random fashion when a plant's gametes form",
			responses: [
				"Carl Correns",
				"Hugo de Vries",
				"Gregor Mendel",
				"Erich von Tschermak",
			],
			question: "Gregor Mendel",
			used: false,
			correct: false,
		},
		{
			value: 400,
			answer: "Surely this rings a bell: the name of this physiologist who studied the secretory activity of digestion from 1890 to 1900",
			responses: [
				"Philip Zimbardo",
				"Sigmund Freud",
				"Carl Jung",
				"Ivan Pavlov",
			],
			question: "Ivan Pavlov",
			used: false,
			correct: false,
		},
		{
			value: 600,
			answer: "This Swede's original scale had water's boiling point at 0 degrees & its freezing point at 100",
			responses: [
				"Kelvin",
				"Celsius",
				"Fahrenheit",
				"Rankine",
			],
			question: "Celsius",
			used: false,
			correct: false,
		},
		{
			value: 800,
			answer: "This giant of modern physics was diagnosed with ALS as a graduate student at Cambridge",
			responses: [
				"Feynman",
				"Einstein",
				"Hawking",
				"Kaku",
			],
			question: "Hawking",
			used: false,
			correct: false,
		},
		{
			value: 1000,
			answer: "This Rome-born physicist designed the first nuclear reactor",
			responses: [
				"Robert Oppenheimer",
				"Enrico Fermi",
				"Emilio Segrè",
				"Luigi Puccianti",
			],
			question: "Enrico Fermi",
			used: false,
			correct: false,
		},
	]
};

let theresawaron = 
{
	name: "there's a war on",
	clues:
	[
		{
			value: 200,
			answer: "A \"conflict\": 1950 to 1953",
			responses: [
				"The Spanish War",
				"The Korean War",
				"Bay of Pigs",
				"The War of 1812",
			],
			question: "The Korean War",
			used: false,
			correct: false,
		},
		{
			value: 400,
			answer: "1846 to 1848: Starring Zachary Taylor",
			responses: [
				"Battle of Palo Alto",
				"The Mexican-American War",
				"Second Seminole War",
				"The War of 1812",
			],
			question: "The Mexican-American War",
			used: false,
			correct: false,
		},
		{
			value: 600,
			answer: "1618 to 1648: Duh",
			responses: [
				"The Dutch Revolt",
				"The Thirty Years' War",
				"The Seven Years' War",
				"The War of 1812",
			],
			question: "The Thirty Years' War",
			used: false,
			correct: false,
		},
		{
			value: 800,
			answer: "April-December 1898",
			responses: [
				"Cuban War of Independence",
				"The Spanish-American War",
				"The Crimean War",
				"The War of 1812",
			],
			question: "The Spanish-American War",
			used: false,
			correct: false,
		},
		{
			value: 1000,
			answer: "In America: 1754 to 1763",
			responses: [
				"The French and Indian War",
				"The American Indian Wars",
				"French Wars of Religion",
				"The War of 1812",
			],
			question: "The French and Indian War",
			used: false,
			correct: false,
		},
	]
};

let popculture = 
{
	name: "pop culture",
	clues:
	[
		{
			value: 200,
			answer: "Beyonce has more than 60 million followers on this photo-sharing app whose logo looks like a Polaroid camera",
			responses: [
				"Twitter",
				"Snapchat",
				"Instagram",
				"Flickr",
			],
			question: "Instagram",
			used: false,
			correct: false,
		},
		{
			value: 400,
			answer: "Twenty One Pilots \"wish we could turn back time to the good old days... but now we're\" this title",
			responses: [
				"Dressed Out",
				"Smoked Out",
				"Blacked Out",
				"Stressed Out",
			],
			question: "Stressed Out",
			used: false,
			correct: false,
		},
		{
			value: 600,
			answer: "Creepers love the gaming channel stampylonghead & its devotion to this ubiquitous Mojang game",
			responses: [
				"Plants vs. Zombies",
				"Minecraft",
				"Fortnite",
				"Clash of Clans",
			],
			question: "Minecraft",
			used: false,
			correct: false,
		},
		{
			value: 800,
			answer: "In 2016 this member of One Direction became a dad to a lad named Freddie",
			responses: [
				"Zayn",
				"Niall",
				"Louis",
				"Liam",
			],
			question: "Louis",
			used: false,
			correct: false,
		},
		{
			value: 1000,
			answer: "Avicii, a 26-year-old superstar in EDM, this type of music, recently died",
			responses: [
				"Electric Digital Motion",
				"Electronic Dance Music",
				"Electronic Direct Mail",
				"Engineered Dance Music",
			],
			question: "Electronic Dance Music",
			used: false,
			correct: false,
		},
	]
}