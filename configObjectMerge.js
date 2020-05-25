/**
 * Given two config like object, merge them together
 * This WILL modify the target object, deep clone if you want to avoid modifying the original object
 * 
 * @param {Object} target 
 * @param {Object} newConfig
 * 
 * @param {Boolean} deepCloneNewConfig, deep clone the new config if set to avoid modification, 
 *                  do not set this to false unless your "newConfig" object is disposable. 
 *                  This is used internally to optimize the config merge performance.
 * 
 * @return {Object} the target object that was merged
 */
function configObjectMerge(target, newConfig, deepCloneNewConfig = true) {
	// Target object check
	if( target == null ) {
		throw "Missing config object to merge into"
	}

	// Quick exit, if newConfig is null
	if( newConfig == null ) {
		return target;
	}
	
	// Safety check the newConfig
	if( typeof newConfig !== "object" ) {
		throw `Unknown object type to merge (expected an object): ${newConfig}`
	}

	// Deep clone newConfig
	if( deepCloneNewConfig ) {
		newConfig = JSON.parse( JSON.stringify(newConfig) );
	}

	// For each item in newConfig
	for (let [key, val] of Object.entries(newConfig)) {
		
		// get the original val
		let originalVal = target[key];

		// simply write over the values if it previously does not exist
		if( originalVal === null || originalVal === undefined ) {
			target[key] = val;
			continue;
		}

		// write over array values
		if( Array.isArray(val) ) {
			target[key] = val;
			continue;
		}

		// does a recursive merge of objects
		// without deep cloning (as its already done for this object)
		if( typeof originalVal === "object" && typeof val === "object" ) {
			target[key] = configObjectMerge(originalVal, val, false);
			continue;
		}

		// Finally simply write any other value over
		// as its probably a standard type (ie, string, number, etc)
		target[key] = val;
		continue;
	}

	// Return the merged target
	return target;
}
/**
 * Given an array of config like object, merge them together.
 * This is an array varient of `configObjectMerge`
 * 
 * @param {Array<Object>} configArr containing multiple config objects 
 * @param {Boolean} deepCloneNewConfig, deep clone the new config if set to avoid modification, 
 *                  do not set this to false unless your "newConfig" object is disposable. 
 *                  This is used internally to optimize the config merge performance.
 * 
 * @return {Object} the target object that was merged
 */
configObjectMerge.all = function all( configArr, deepCloneNewConfig = true ) {
	let res = {};
	for( let i=0; i<configArr.length; ++i ) {
		res = configObjectMerge(res, configArr[i], deepCloneNewConfig);
	}
	return res;
}

// Export the function
module.exports = configObjectMerge;