/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This suite is all about the RSS feeds definitions,
	 * the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function() {
		/* Tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty.
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		// Loop through each feed in the allFeeds object and
		// ensure it has a URL defined and that the URL is not empty
		it('should have non empty url', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeTruthy();
			});
		});

		// Loop through each feed in the allFeeds object and
		// ensure it has a name defined and that the name is not empty
		it('should have non empty name', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeTruthy();
			});
		});
	});

	// Test suite to test "The menu" 
	describe('The menu', function() {

		// The menu element should be hidden by default.
		it('should be hidden by default', function() {
			let body = document.querySelector('body');
			expect(body.classList.length).toBeGreaterThan(0);
			expect(body.classList[0]).toBe('menu-hidden');
		});

		// The menu should change visibility when the menu icon is clicked.
		// The menu should display when clicked and should be hidden when clicked again. 
		it('should change visibility when clicked', function() {
			let body = document.querySelector('body');

			// Menu should display when clicked
			$('.menu-icon-link').click();
			menuHiddenBefore = []
			body.classList.forEach(function(c){
				if(c === 'menu-hidden'){
					menuHiddenBefore.push(c);
				}
			});
			expect(menuHiddenBefore.length).toBe(0);
			
			// Menu should be hidden when clicked again
			$('.menu-icon-link').click();
			menuHiddenAfter = []
			body.classList.forEach(function(c){
				if(c === 'menu-hidden'){
					menuHiddenAfter.push(c);
				}
			});
			expect(menuHiddenAfter.length).toBeGreaterThan(0);
		});
	});

	// Test suite to test "Initial Entries" 
	describe('Initial Entries', function() {
		
		// Jasmine's beforeEach and asynchronous done() function. 
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});
		// When the loadFeed function is called and completes its work,
		// there is at least a single .entry element within the .feed container.
		it('should have at least a single .entry element within the .feed container', function(done) {
			let feedContainer = document.querySelector('.feed');
			let entryLinks = feedContainer.querySelectorAll('.entry-link');
			expect(entryLinks.length).not.toBe(0);
			done();
		});
	});

	// Test suite to test "New Feed Selection" 
	describe('New Feed Selection', function() {
		
		// When a new feed is loaded by the loadFeed function, the content of feed should actually change.
		let feedContainer = document.querySelector('.feed');
		let entryLinksBefore = undefined;
		let entryLinksAfter = undefined;
		// To simulate feed selection, we are loading feed index 0 and then loading feed index 1
		beforeEach(function(done) {
			loadFeed(0, function() {
				entryLinksBefore = feedContainer.querySelectorAll('.entry-link');
				loadFeed(1, function() {
					entryLinksAfter = feedContainer.querySelectorAll('.entry-link');
					done();
				});
			});
		});
		it('should change the content', function(done) {
			expect(entryLinksAfter).not.toEqual(entryLinksBefore);
			done();
		});
	});
}());