defmodule Twurl.Mixfile do
  use Mix.Project

  def project do
    [app: :twurl,
     version: "0.0.1",
     elixir: "~> 1.0",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix] ++ Mix.compilers,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     deps: deps]
  end

  # Configuration for the OTP application
  #
  # Type `mix help compile.app` for more information
  def application do
    [mod: {Twurl, []},
     applications: [:phoenix, :phoenix_html, :cowboy, :httpoison, :logger]]
  end

  # Specifies which paths to compile per environment
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Specifies your project dependencies
  #
  # Type `mix help deps` for examples and options
  defp deps do
    [{:phoenix, "~> 0.14"},
     {:phoenix_html, "~> 1.1"},
     {:phoenix_live_reload, "~> 0.4", only: :dev},
     {:cowboy, "~> 1.0"},
     {:rethinkdb, github: "hamiltop/rethinkdb-elixir"},
     {:oauth, github: "tim/erlang-oauth"},
     {:httpoison, "~> 0.7"},
     {:jsx, "~> 2.0"},
     {:extwitter, "~> 0.2"}]
  end
end
