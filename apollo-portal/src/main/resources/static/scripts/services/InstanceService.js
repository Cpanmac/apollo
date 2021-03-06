appService.service('InstanceService', ['$resource', '$q', function ($resource, $q) {
    var resource = $resource('', {}, {
        find_instances_by_release: {
            method: 'GET',
            url: '/envs/:env/instances/by-release'
        },
        find_instances_by_namespace: {
            method: 'GET',
            isArray: false,
            url: '/envs/:env/instances/by-namespace'
        },
        find_by_releases_not_in: {
            method: 'GET',
            isArray: true,
            url: '/envs/:env/instances/by-namespace-and-releases-not-in'
        },
        get_instance_count_by_namespace: {
            method: 'GET',
            isArray: false,
            url: "envs/:env/instances/by-namespace/count"
        }
    });

    return {
        findInstancesByRelease: function (env, releaseId, page) {
            var d = $q.defer();
            resource.find_instances_by_release({
                                                   env: env,
                                                   releaseId: releaseId,
                                                   page: page
                                               },
                                               function (result) {
                                                   d.resolve(result);
                                               }, function (result) {
                    d.reject(result);
                });
            return d.promise;
        },
        findInstancesByNamespace: function (appId, env, clusterName, namespaceName, page) {
            var d = $q.defer();
            resource.find_instances_by_namespace({
                                                     env: env,
                                                     appId: appId,
                                                     clusterName: clusterName,
                                                     namespaceName: namespaceName,
                                                     page: page
                                                 },
                                                 function (result) {
                                                     d.resolve(result);
                                                 }, function (result) {
                    d.reject(result);
                });
            return d.promise;
        },
        findByReleasesNotIn: function (appId, env, clusterName, namespaceName, releaseIds) {
            var d = $q.defer();
            resource.find_by_releases_not_in({
                                                 env: env,
                                                 appId: appId,
                                                 clusterName: clusterName,
                                                 namespaceName: namespaceName,
                                                 releaseIds: releaseIds
                                             },
                                             function (result) {
                                                 d.resolve(result);
                                             }, function (result) {
                    d.reject(result);
                });
            return d.promise;
        },
        getInstanceCountByNamespace: function (appId, env, clusterName, namespaceName) {
            var d = $q.defer();
            resource.get_instance_count_by_namespace({
                                                         env: env,
                                                         appId: appId,
                                                         clusterName: clusterName,
                                                         namespaceName: namespaceName
                                                     },
                                                     function (result) {
                                                         d.resolve(result);
                                                     }, function (result) {
                    d.reject(result);
                });
            return d.promise;
        }

    }
}]);
