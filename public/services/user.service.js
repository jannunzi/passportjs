(function()
{
  angular
    .module("WhiteBoardApp")
    .factory("UserService", UserService);

  function UserService($http)
  {
    var service =
    {
      createUser : createUser,
      login      : login,
      update     : update
    };
    return service;
    
    function createUser(user, callback)
    {
      $http.post("/rest/user", user)
      .success(callback);
    }

    function login(user, callback)
    {
      $http.post("/rest/login", user)
      .success(callback);
    }

    function update(user, callback)
    {
      $http.put("/rest/update", user)
      .success(callback)
    }
  }
})();
