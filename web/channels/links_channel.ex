defmodule Twurl.LinksChannel do
  use Phoenix.Channel
  require Logger
  alias RethinkDB.Query
  alias Twurl.Repo
  require IEx

  def join("links", message, socket) do
    send(self, :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    push socket, "new:msg", %{:msg => "welcome"}
    q = Query.table("links")
    result = Repo.run(q)
    Enum.each(result.data, fn message -> push socket, "new:msg", message end)
    changes = Query.changes(q)
    |> Repo.run
      Task.async fn ->
        Enum.each(changes, fn change ->
          push socket, "new:msg", change["new_val"]
        end)
      end
    {:noreply, socket}
  end

  def handle_in("new:msg", msg, socket) do
    q = Query.table("links")
    |> Query.insert(%{url: msg["url"], title: msg["title"]})
    Repo.run(q)

    {:reply, {:ok, msg["url"]}, msg["title"]}
  end
end
