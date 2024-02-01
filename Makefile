# Variables
PNPM := pnpm
PACKAGES := packages/*
MODELS := packages/models
API := packages/api
SDK := packages/sdk

# Objetivos predeterminados
all: lint install

# Instalar todas las dependencias
install:
	$(PNPM) install --ignore-scripts

# Lint en todos los paquetes
lint:
	$(PNPM) run lint

# Construir todos los paquetes
build:
# build models, api and sdk in this order
	cd $(MODELS) && $(PNPM) run build
	cd $(API) && $(PNPM) run build
	cd $(SDK) && $(PNPM) run build

# Publicar todos los paquetes
publish:
# build previous to publish
	make build
# publish models, api and sdk in this order
	cd $(MODELS) && $(PNPM) publish --access public
	cd $(API) && $(PNPM) publish --access public
	cd $(SDK) && $(PNPM) publish --access public

# Objetivo para ejecutar cualquier script personalizado
run-script:
	$(PNPM) run $(script)
