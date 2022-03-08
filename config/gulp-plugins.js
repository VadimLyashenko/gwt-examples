// Импортируем модули
import notify from "gulp-notify";
import newer from "gulp-newer";
import plumber from "gulp-plumber";
import ifPlugin from "gulp-if";
import rename from 'gulp-rename';

// Экспортируем объект
export const plugins = {
  notify,
  if: ifPlugin,
  newer,
  plumber,
  rename
}
