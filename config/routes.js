/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'get /api/v1/roles': 'RoleController.index',
  'get /api/v1/users': 'UserController.index',
  'post /api/v1/users': 'UserController.create',
  'put /api/v1/users/:id': 'UserController.update',
  'get /api/v1/user/auth': 'UserController.auth',
  'get /api/v1/user/:id': 'UserController.detail',
  'get /api/v1/categories': 'CategoryController.index',
  'get /api/v1/stories': 'StoryController.index',
  'get /api/v1/story/:id/suggestion': 'StoryController.suggestion',
  'get /api/v1/story/:id': 'StoryController.detail',
  'post /api/v1/stories': 'StoryController.create',
  'get /api/v1/images': 'ImageController.index',
  'get /api/v1/page_types': 'PageTypeController.index',
  'get /api/v1/pages': 'PageController.index',

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
