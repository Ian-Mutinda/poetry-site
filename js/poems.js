/**
 * poems.js — Poetry Collection Data
 * Add new poems here without touching HTML files.
 * Each poem: { id, title, author, date, preview, content }
 */

const POEMS = [

  // ── Category 1: Love / Attraction ──────────────────────

  {
    id: 0,
    title: "The Way You Smile",
    author: "Ian Mutinda",
    date: "12 April 2026",
    preview: "It's the way you smile\nwhen you catch me staring",
    content: `It's the way you smile
when you catch me staring

like you already knew
you had me

the way you push my face away
like I'm seeing too much
or cover my eyes
like you can hide from it

but you can't

because it's in the way you breathe
when I'm too close
in the way your voice shifts
just enough for me to notice

you give yourself away
every time

and I don't look away

I take it in
all of it

the smile
the hesitation
the way you pretend you don't feel it

when we both know you do

and maybe that's the part I like most

that you try to hide it

and still fail
every single time`
  },

  {
    id: 1,
    title: "Realization",
    author: "Ian Mutinda",
    date: "13 April 2026",
    preview: "It didn't happen all at once\nthere was no warning",
    content: `It didn't happen all at once

there was no warning
no dramatic shift

just small things
stacking quietly against me

and then it hit me

I don't just like you

and I don't want to fight it`
  },

  {
    id: 2,
    title: "My Little Fox",
    author: "Ian Mutinda",
    date: "15 April 2026",
    preview: "At first\nyou were just beautiful",
    content: `At first
you were just beautiful

but then I saw more

and something in me shifted

I don't just want you

I want to stand between you
and anything that's ever tried to break you

my little foxy`
  },

  {
    id: 3,
    title: "Unspoken Desire",
    author: "Ian Mutinda",
    date: "17 April 2026",
    preview: "My lips don't rush yours\nthey linger",
    content: `My lips don't rush yours

they linger

just long enough
to feel you hesitate

and then you come back

not shy anymore

just honest

and I meet you there
every time`
  },

  // ── Category 2: Longing / Distance ─────────────────────

  {
    id: 4,
    title: "Missing You",
    author: "Ian Mutinda",
    date: "17 April 2026",
    preview: "I miss you\nmore than I let myself admit",
    content: `I miss you
more than I let myself admit

it lives in the quiet

your voice
your laughter

like fog

close
but untouchable`
  },

  {
    id: 5,
    title: "Ghost of Your Touch",
    author: "Ian Mutinda",
    date: "19 April 2026",
    preview: "I still feel it\nyour hands, your warmth",
    content: `I still feel it

your hands
your warmth

now just memory

a ghost

that refuses to leave`
  },

  {
    id: 6,
    title: "Every Time You Post",
    author: "Ian Mutinda",
    date: "23 April 2026",
    preview: "Every time you post\nI see you",
    content: `Every time you post

I see you

and it does something to me

not anger

just something heavier

because I feel everything
and have none of it`
  },

  {
    id: 7,
    title: "Distance",
    author: "Ian Mutinda",
    date: "25 April 2026",
    preview: "I don't fight it anymore\nthe distance",
    content: `I don't fight it anymore

the distance

the feeling

you're there

but not here`
  },

  // ── Category 3: Obsession / Peak ───────────────────────

  {
    id: 8,
    title: "You Take Up Space",
    author: "Ian Mutinda",
    date: "25 April 2026",
    preview: "You fill my thoughts\neven when I don't want you to",
    content: `You fill my thoughts

even when I don't want you to

you're just there`
  },

  {
    id: 9,
    title: "Why You",
    author: "Ian Mutinda",
    date: "28 April 2026",
    preview: "What is it about you\nthat makes everything shift",
    content: `What is it about you

that makes everything shift

that makes me feel too much`
  },

  {
    id: 10,
    title: "Default Thought",
    author: "Ian Mutinda",
    date: "29 April 2026",
    preview: "You are my default\nmy mind returns to you",
    content: `You are my default

my mind returns to you

every time`
  },

  {
    id: 11,
    title: "I Stop Fighting It",
    author: "Ian Mutinda",
    date: "1 May 2026",
    preview: "I stop resisting\nyou",
    content: `I stop resisting

you

the thoughts

the feeling

I let it exist`
  },

  {
    id: 12,
    title: "Built Wrong",
    author: "Ian Mutinda",
    date: "3 May 2026",
    preview: "I fight my own head\nmore than anything else",
    content: `I fight my own head
more than anything else

words don't come out
the way I mean them

they twist
somewhere between thought and voice

and by the time they reach you
they sound like something else

like I'm hiding something
like I'm not being real

and you look at me like I'm lying
and I don't know how to fix it

because I'm not

I just don't know how to say things
the way I feel them

and it's frustrating
knowing everything is clear in my head
but falls apart the moment I try to give it to you

like I'm built wrong
in the one place that matters

and I hate it

because it makes me look like someone I'm not

when all I'm trying to do
is be honest with you`
  }

];

// Export for use in other scripts
if (typeof module !== 'undefined') {
  module.exports = POEMS;
}
