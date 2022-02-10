run:
	bundle exec jekyll serve

drafts:
	bundle exec jekyll serve --drafts

build:
	rm -rf docs/
	mkdir -p docs/
	bundle exec jekyll build --destination docs/
	cp ./.nojekyll ./docs/.nojekyll