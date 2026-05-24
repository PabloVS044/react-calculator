# React Calculator

Calculadora web inspirada en la interfaz de iOS, construida con React, TypeScript y Vite. El proyecto fue desarrollado con enfoque en componentes reutilizables, pruebas, Storybook y reglas de linting alineadas con la rúbrica del laboratorio.

## Demo

- Aplicación desplegada: https://bombardeen-palencia.xyz/pablo/react-calculator/

## Funcionalidades

- Ingreso de datos únicamente mediante botones HTML
- Display no editable
- Concatenación de dígitos en orden de ingreso
- Limpieza del display al iniciar el segundo operando
- Resolución de operaciones encadenadas al presionar un nuevo operador
- Soporte para `+`, `-`, `×`, `÷`, `%` y `=`
- Soporte para `.` y `+/-`
- Límite máximo de 9 caracteres visibles en el display
- `ERROR` cuando una resta produce un resultado negativo
- `ERROR` cuando un resultado supera `999999999`
- Ajuste visual del display para números largos

## Tecnologías

- React 19
- TypeScript
- Vite
- Vitest
- Testing Library
- Storybook
- ESLint
- pnpm

## Requisitos

- Node.js
- pnpm `11.2.2` o compatible

## Instalación

```bash
pnpm install
```

## Uso local

Levantar la aplicación en modo desarrollo:

```bash
pnpm dev
```

Abrir la URL que muestra Vite, normalmente:

```text
http://localhost:5173
```

## Scripts disponibles

```bash
pnpm dev
pnpm build
pnpm preview
pnpm test
pnpm test:watch
pnpm lint
pnpm typecheck
pnpm storybook
pnpm build-storybook
```

Nota: la rúbrica pide poder correr los tests desde la raíz con `npm test` o equivalente. Este proyecto define el script `test` en `package.json`, por lo que también puede ejecutarse con `npm test` si el entorno tiene npm instalado.

## Testing

Las pruebas están hechas con Vitest y Testing Library.

Ejecutar todas las pruebas:

```bash
pnpm test
```

Ejecutar en modo watch:

```bash
pnpm test:watch
```

Actualmente el proyecto cubre flujos no triviales como:

- concatenación de dígitos
- límite de 9 caracteres
- limpieza del display tras operador
- operaciones encadenadas
- `=`
- resta negativa con `ERROR`
- punto decimal
- división con resultado decimal
- módulo
- `+/-`
- overflow con `ERROR`

## Storybook

Para levantar Storybook localmente:

```bash
pnpm storybook
```

Para generar la versión estática:

```bash
pnpm build-storybook
```

El proyecto incluye historias para:

- aplicación completa
- botón genérico
- display
- keypad

## Linting

Ejecutar lint:

```bash
pnpm lint
```

La configuración incluye reglas alineadas con la rúbrica:

- regla custom que prohíbe puntos y coma
- máximo de 120 caracteres por línea
- validación sobre archivos `ts` y `tsx`

## Type Checking

```bash
pnpm typecheck
```

## Build de producción

```bash
pnpm build
```

Los archivos listos para producción se generan en:

```text
dist/
```

## Despliegue en el servidor de la clase

La aplicación está desplegada bajo la subruta:

```text
/pablo/react-calculator/
```

Si necesitas reconstruir y subir una nueva versión a esa ruta:

```bash
pnpm exec vite build --base=/pablo/react-calculator/
scp -r dist/. pvasquezs044@35.232.139.23:/var/www/html/pablo/react-calculator/
```

## Estructura del proyecto

```text
src/
  components/      Componentes de UI y stories
  constants/       Configuración de botones y límites
  hooks/           Hook principal de la calculadora
  test/            Setup de pruebas
  types/           Tipos compartidos
  utils/           Lógica de cálculo y helpers
```

## Decisiones de implementación

- La lógica principal vive en un hook propio: `useCalculator`
- Los botones se renderizan a partir de configuración declarativa
- La UI está separada de la lógica de cálculo
- Los componentes principales se mantuvieron debajo de 20 líneas para cumplir la rúbrica
- El proyecto usa `pnpm` y mantiene su `pnpm-lock.yaml` versionado

## Criterios de la rúbrica cubiertos

- calculadora funcional basada en componentes
- tests no triviales
- historias de Storybook
- lint con reglas custom
- punto decimal
- división
- módulo
- `+/-`
- hook propio
- componentes cortos
- title y favicon personalizados
- TypeScript
- uso de `pnpm`

## Autor

- Pablo Vásquez
