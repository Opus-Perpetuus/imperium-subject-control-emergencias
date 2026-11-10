# Control de emergencias

Quien usa la app entra al menú «Control de emergencias» y consulta el
registro de emergencias. Queda probado que la lista de `registro-emergencias`
responde por la app `subject-control-emergencias`.

## Sub-features

La app hace la acción de `registro-emergencias`. Escribe: no. Esta ficha no
lleva línea `Subject:` con imagen: el catálogo no da un tag para rellenarla.
El hueco está en `despliegue.md` del monorepo.

- `registro-emergencias` deja un resultado observable: status HTTP de
  `GET /registro-emergencias`.

### Archivos y contratos

- `src/subject.ts` — `define_subject` de `subject-control-emergencias`; no
  declara `dependsOn`.
- `src/modules/registro-emergencias/registro-emergencias.routes.ts` —
  `define_crud` del recurso `registro-emergencias` (`GET /registro-emergencias`,
  `GET /registro-emergencias/:id`).

### Mapa

| id | ruta | rol semilla | pasos | esperado | muta | receta |
| --- | --- | --- | --- | --- | --- | --- |
| `subject-control-emergencias.registro-emergencias` | `GET /registro-emergencias` | sin definir | listar el recurso | status HTTP 200 | no | sin definir |

## How to get to it (user POV)

- Menú «Control de emergencias» → «Registro de emergencias» (`path:
  registro-emergencias` en `manifest.json`).

## Driving it with arnes

Preconditions:

- Doctor en 0. Si falta `subject-control-emergencias`, la receta sale
  `omitida`.
- Base QA y rol semilla sin definir: no corre ninguna receta que mute.

- **Abrir.** Ruta `GET /registro-emergencias` y su status HTTP.
- **Proof.** `evidence/control-emergencias/`.

## Gotchas

- Una receta de lectura que escribe sale en fallo aunque la pantalla se vea bien.
- Mutar solo contra una base QA nombrada en esta ficha; hoy no hay ninguna.
- `omitida` no cuenta como probada.
