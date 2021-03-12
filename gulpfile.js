const gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer");

const srcPath = "./src/";
const scssPath = `${srcPath}scss/`;

gulp.task("default", function () {
  return gulp.watch(`${scssPath}*.scss`, function () {
    // style.scssの更新があった場合の処理

    // style.scssファイルを取得
    return (
      gulp
        .src(`${scssPath}/*.scss`)
        // Sassのコンパイルを実行
        .pipe(
          sass({
            outputStyle: "expanded",
          })
            // Sassのコンパイルエラーを表示
            // (これがないと自動的に止まってしまう)
            .on("error", sass.logError)
        )

        .pipe(
          autoprefixer({
            cascade: false,
          })
        )
        // cssフォルダー以下に保存
        .pipe(gulp.dest("./css/"))
    );
  });
});
