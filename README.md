# config-object-merge

Given two config like object, merge them together - think if it as a recrusive merge that does *not* merge arrays

# npm install

```.bash
npm install --save @js-util/config-object-merge
```

# Example usage

```.js
// Importing the module
const configObjectMerge = require("@js-util/config-object-merge");

// Example object to merge into
let target = {
	"hello": {
		"world" : "its ok!",
		"array" : [
			"this will not be merged in",
			{
				"note": "nor will this"
			}
		]
	},
	"but" : "this would"
};

// Using the following data
let merge = {
	"hello": {
		"array": [
			{
				"note" : "this will replace the whole array"
			}
		]
	},
	"but"  : "and change this value",
	"with" : "this extra field"
}

// Merge them together
configObjectMerge( target, merge ); 

// And you would get the following result
let result = {
	"hello": {
		"world" : "its ok!",
		"array": [
			{
				"note" : "this will replace the whole array"
			}
		]
	},
	"but"  : "and change this value",
	"with" : "this extra field"
}
```
