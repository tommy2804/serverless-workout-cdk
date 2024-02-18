deps:
	npm ci

build:
	npm run build

integration: 
	npm run test

deploy:
	make build
	cdk deploy --require-approval=never

deploy-dev:
	make build
	cdk deploy --require-approval=never --profile dev

diff:
	cdk diff

clean:
	rm -rf cdk.out

fast-deploy:
	make build
	cdk deploy --hotswap --require-approval=never

destroy:
	cdk destroy --force

delete-lambdas:
	cd service/; \
		node delete-lambdas.js 