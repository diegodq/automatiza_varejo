module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
				"@controllers/*": ["./dist/controllers/*"],
				"@migrations/*": ["./dist/migrations/*"],
				"@configurations/*":["./dist/configurations/*"],
				"@entities/*":["./dist/entities/*"],
				"@repositories/*":["./dist/repositories/*"],
				"@services/*":["./dist/services/*"],
				"@routes/*":["./dist/routes/*"],
				"@middleware/*":["./dist/middleware/*"],
				"@utils/*":["./dist/utils/*"],
				"@params/*":["./dist/params/*"],
      }
    }],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
  ],
}