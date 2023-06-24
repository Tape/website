---
date: 2023-06-24
title: Thoughts On Copilot
---

This is just a short blog to voice my opinions and experiences with GitHub Copilot. I may or may not be trying to find a
quick idea to throw together and play more Final Fantasy XVI.

---

## Positives

I've had some stupidly good prompts come up for what I can only assume are common tasks. A good example is using some
of the more common third party libraries in Python, which has provided great assistance without having to scroll
through documentation.

I've also had some great prompts that teach me features I did not even know exist. An example being that WebClient can
be mocked by replacing the default `ExchangeFunction`, which up until that point I had only thought could have been done
with way too many Mockito mocks.

Copilot X has looked promising so far and seems to fill in some voids that the current rendition has, such as full test
case generation from implementation code. There's unfortunately still not a release date, so who knows when we'll
actually be able to get our hands on it.

## Negatives

I throw away the vast majority of the completions, mainly because for the most part they are something the IDE would
have taken care of in the first place.

Test generation is pretty severely lacking. If you are writing tests that borrow a lot of similar logic between cases
it can be ok, but for the most part you're left to write your own test cases.

Copilot is confidently incorrect. Sometimes the prompt it spits out looks pretty good, but when you actually accept it
you find it is littered with bugs and function calls that don't actually exist.

## Conclusion

I think GitHub Copilot justifies its price tag for both personal and commercial use. I feel like the occasional learning
opportunity I get from completions warrant its existence. By far and large though in real world application it's still
very much lacking and is confidently incorrect. In a world where companies are making millions of dollars an hour I do
think even a minuscule improvement is worth the $19/month price tag.
