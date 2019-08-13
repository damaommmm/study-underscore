(function(global, factory) {
	factory((global.Redux = {}));
})(this, function(exports) {

	function isPlainObject(obj) {
		return toString.call(obj) === "[object Object]";
	}
	//enhancer 增强器
	function createStore(reducer, preloadedState, enhancer) {
		//enhancer  是否传入了多个的增强器函数，如果是请组合。
		if (
			(typeof preloadedState === 'function' && typeof enhancer === 'function') ||
			(typeof enhancer === 'function' && typeof arguments[3] === 'function')
		) {
			throw new Error(
				'It looks like you are passing several store enhancers to ' +
				'createStore(). This is not supported. Instead, compose them ' +
				'together to a single function.'
			)
		}

		//preloadedState =>  enhancer
		if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
			enhancer = preloadedState
			preloadedState = undefined
		}

		//enhancer 必须是一个函数
		if (typeof enhancer !== 'undefined') {
			if (typeof enhancer !== 'function') {
				throw new Error('Expected the enhancer to be a function.')
			}
			return enhancer(createStore)(reducer, preloadedState)
		}
		//reducer 必须是一个函数
		if (typeof reducer !== 'function') {
			throw new Error('Expected the reducer to be a function.')
		}

		let currentReducer = reducer //createStore调用时传入的第一个参数
		let currentState = preloadedState //createStore调用时传入的第二个参数
		let currentListeners = [] //当前订阅者列表
		let nextListeners = currentListeners //新的订阅者列表
		let isDispatching = false //锁  数据的一致性  
		
		//返回currentListeners
		function ensureCanMutateNextListeners() {
			if (nextListeners === currentListeners) {
				nextListeners = currentListeners.slice()
			}
		}

		function subscribe(listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected the listener to be a function.')
			}

			if (isDispatching) {
				throw new Error(
					'You may not call store.subscribe() while the reducer is executing. ' +
					'If you would like to be notified after the store has been updated, subscribe from a ' +
					'component and invoke store.getState() in the callback to access the latest state. ' +
					'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
				)
			}
			//订阅者 订阅的状态  true === 订阅中  false - 取消订阅
			let isSubscribed = true

			ensureCanMutateNextListeners()
			nextListeners.push(listener)

			return function unsubscribe() {   
				if (!isSubscribed) {
					return
				}

				if (isDispatching) {
					throw new Error(
						'You may not unsubscribe from a store listener while the reducer is executing. ' +
						'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
					)
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				const index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
			}
		}

		function getState() { //getState
			//isDispatching true
			if (isDispatching) {
				throw new Error(
					'You may not call store.getState() while the reducer is executing. ' +
					'The reducer has already received the state as an argument. ' +
					'Pass it down from the top reducer instead of reading it from the store.'
				)
			}

			return currentState; //state
		}

		function dispatch(action) {
			//action
			if (!isPlainObject(action)) {
				throw new Error(
					'Actions must be plain objects. ' +
					'Use custom middleware for async actions.'
				)
			}
			//action.type
			if (typeof action.type === 'undefined') {
				throw new Error(
					'Actions may not have an undefined "type" property. ' +
					'Have you misspelled a constant?'
				)
			}
			//保证数据的一致性
			if (isDispatching) {
				throw new Error('Reducers may not dispatch actions.')
			}

			try {
				isDispatching = true
				currentState = currentReducer(currentState, action)
			} finally {
				isDispatching = false
			}

			//事件侦听
			const listeners = (currentListeners = nextListeners)
			for (let i = 0; i < listeners.length; i++) {
				const listener = listeners[i]
				listener()   //执行注册的监听器
			}

			return action
		}

		return {
			getState,
			dispatch,
			subscribe
		}
	}
	exports.createStore = createStore;
});
