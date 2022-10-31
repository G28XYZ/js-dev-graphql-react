// Режим сборки development или production
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

// Опции webpack
const config = {
  entry: "index.tsx", // Главный файл приложения
  target: "web",
  mode: process.env.NODE_ENV,
  devtool: "source-map",
  context: path.join(__dirname, "./src"), // Директория с исходным кодом приложения
  output: {
    path: path.join(__dirname, "dist"), // Куда и как делать сборку
    filename: "[name].js",
    clean: true, // Очистить ./dist от предыдущей сборки
  },
  plugins: [
    new MiniCssExtractPlugin(), // Сборка стилей в отдельный файл
    new HtmlWebPackPlugin({
      // Создание dist/index.html с подключенной сборкой
      template: "./index.html",
      filename: "./index.html",
      base: "/",
      favicon: "./favicon.ico",
    }),
    new CleanWebpackPlugin(),
  ],

  //
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"], // Расширения по умолчанию, если не указаны в import
    modules: ["./", "node_modules"], // Где искать файлы подключаемых модулей
  },
  module: {
    rules: [
      // Транспиляция JS
      {
        test: /\.(ts|tsx)?$/,
        loader: "ts-loader",
      },
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
      },
      // Возможность подключать css как модули, чтобы попали в сборку
      // С опцией modules при импорте стиля получаем объект с названиями ccs классов
      {
        test: /\.(sc|sa|c)ss$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }, { loader: "postcss-loader" }],
      },
    ],
  },
};

// Локальный сервер для отладки приложения
if (process.env.NODE_ENV === "development") {
  // Установить тестовое имя приложения и версию
  config.plugins.push(
    new webpack.DefinePlugin({
      BRAND_NAME: JSON.stringify("Test app"),
      VERSION: JSON.stringify("1.0.0"),
    })
  );
  config.devtool = "inline-source-map";
  config.devServer = {
    static: path.join(__dirname, "./"),
    port: 8020,
    historyApiFallback: true,
    open: false,
    proxy: {
      "/random/**": {
        target: "https://some-random-api.ml",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "/random": "",
        },
      },
      "/api/**": {
        target: process.env.API_URI,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      },
    },
  };
}

module.exports = config;
