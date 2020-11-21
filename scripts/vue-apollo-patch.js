// const fs = require('fs');
// const path = require('path');

// const loadTrackingPath = path.resolve(
//   __dirname,
//   '../node_modules/@vue/apollo-composable/dist/util/loadingTracking.js',
// );

// fs.writeFileSync(
//   loadTrackingPath,
//   fs.readFileSync(loadTrackingPath, 'utf8').replace(/\.\$root/m, '.root'),
// );

// const useMutationPath = path.resolve(
//   __dirname,
//   '../node_modules/@vue/apollo-composable/dist/useMutation.js',
// );

// const useQueryPath = path.resolve(
//   __dirname,
//   '../node_modules/@vue/apollo-composable/dist/useQuery.js',
// );

// fs.writeFileSync(
//   useQueryPath,
//   fs
//     .readFileSync(useQueryPath, 'utf8')
//     .replace(/(^.*onServerPrefetch)/m, '$1=()=>{}; $1')
//     .replace(/(.* require\("vue"\);)/m, '')
//     .replace(/^.*(nextTick)/m, 'vue_demi_1.$1'),
// );

// fs.writeFileSync(
//   useMutationPath,
//   fs
//     .readFileSync(useMutationPath, 'utf8')
//     .replace(/(^.*onServerPrefetch)/m, '$1=()=>{}; $1')
//     .replace(/(.* require\("vue"\);)/m, '')
//     .replace(/^.*(nextTick)/m, 'vue_demi_1.$1'),
// );

// console.log('script done');

// /*
//   If you see an error about lodingTracking not defined using #vue3 #typescript and #vueapollo
//   create a folder "scripts" at the root of your project, and paster this code, after add postinstall script in your package.json

//   "scripts": {
//     "postinstall": "node scripts/vue-apollo-patch.ts"
//   }

//   Please be sure that path is file and package json set correct
// */
