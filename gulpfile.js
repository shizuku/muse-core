const { dest } = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

function compile() {
    return tsProject.src()
    .pipe(tsProject())
    .js.pipe(dest("dist"));
}

exports.default = compile
