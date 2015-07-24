defmodule Twurl.Router do
  use Twurl.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Twurl do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  socket "/ws", Twurl do
    channel "links", LinksChannel
  end

  # Other scopes may use custom stacks.
  # scope "/api", Twurl do
  #   pipe_through :api
  # end
end
