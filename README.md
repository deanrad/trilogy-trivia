# Trilobytes

[☞ Here to report an Issue ?](https://github.com/deanius/trilogy-trivia/issues/new)

Watch the Overview video on [Youtube](https://www.youtube.com/watch?v=Tm6ia1D3WuM&feature=youtu.be)
([Slide Deck](https://s3.amazonaws.com/www.deanius.com/Trilobytes.pdf))

<img src="https://s3.amazonaws.com/www.deanius.com/img/trilobyte-screens.jpg" width="400" alt="Trilogy Mockup">

# Question Bank

## [How to Contribute!](https://www.youtube.com/watch?v=pYLsy-6UZdQ) (7:30 minutes, Youtube)

Help us contribute to this! Because of the way the repo is organized, simply dumping questions/answers/links into [questions.json](./client/data/questions.json) would suffice to share questions across all cohorts, if merged in via Pull Requests.

Per [Issue #42](https://github.com/deanius/trilogy-trivia/issues/42), we could deal with choosing a subset of questions at the beginning of the round, and allow categorizing of the questions via topic/module. This bears a longer discussion, but right now, fork/edit/deploy will suffice for anyone to try this tool out with their own questions.

Question Schema:

```
  prompt: String
  choices: [String]
  answer: String
  links: [{href(URL), text(String)}]
```

* Currently limited to the static list of questions defined in [questions.json](./data/questions.json)

* An authoring tool/question randomizer would be great - but meanwhile, edit the questions and redeploy

# Running a Game

## Setup

* Set up your questions, with answers and reference links, in [questions.json](./data/questions.json)
* Make a new heroku app, if you don't have one already.
* Do `yarn build`, and commit built files.
* Push to your heroku instance.
* Bring `http://your-app.herokuapp.com/live` up on the shared projector display, and `http://your-app.herokuapp.com/remote` up on a device.
* Students should see on the home page that they can join at the link `http://your-app.herokuapp.com/`
* Students will enter their names and wait.

## Instructor clicks 'Advance Question'

* Students answer
* When the instructor desires, they Reveal the answer
* Then Advances to the next question

## Ending the game

Not enabled yet!

# State Diagram

![Redux State](https://user-images.githubusercontent.com/24406/32809461-827a80c8-c95c-11e7-8636-1ae202a44cff.png)

* `round` - the current question and any responses
* `title` - the title of the game
* `players` - who's playing: map of Guid to `{name}`
* `clientId` - each browser tab is identified with a Guid stored in state here, and this is sent along with every response to the server

# Synchronization

Currently every connected browser gets an update of the server-side state object via a `STATE_UPDATE` event.

This means everyone's response goes to everyone's browser. While that is inefficient, it is intended to be pruned down later. Per [Issue #26](https://github.com/deanius/trilogy-trivia/issues/26) though, it would be nice for a user to know whether they were the first to answer, and thus some knowledge of others' responses could be useful.

# Future work

[The Huboard Kanban Board](https://huboard.com/deanius/trilogy-trivia) has a bunch of issues, which are synced to Github Issues. Huboard is awesome.

_Thank you for helping to make Trilobytes awesome and improve Student fun and retention!_
