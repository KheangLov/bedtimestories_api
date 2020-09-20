/**
 * StoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async (req, res) => {
    res.send(await StoryService.getStories(req));
  },

  detail: async (req, res) => {
    res.send(await StoryService.getStoryDetail(req));
  },

  create: async (req, res) => {
    res.send(await StoryService.createStory(req));
  },

  suggestion: async (req, res) => {
    res.send(await StoryService.suggestionStory(req));
  }

};

