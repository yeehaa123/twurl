defmodule Twurl.PageController do
  use Twurl.Web, :controller
  alias RethinkDB.Query
  alias Twurl.Repo

  @embedly "http://api.embed.ly/1/extract?key=5406650948f64aeb9102b9ea2cb0955c"

  def index(conn, _params) do
    ExTwitter.user_timeline
      |> extract_links
      |> get_link_data 
      |> Enum.map(&save_link(&1))
    render conn, "index.html"
  end

  def extract_links(tweets) do
    tweets 
      |> Enum.map(fn(%{text: text}) -> text end)
      |> Enum.filter(fn(tweet) -> String.contains?(tweet, "http://") end)
      |> Enum.map(&(extract_link(&1)))
   end

  def extract_link(tweet) do
    Regex.run(~r/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/? */, tweet) |> hd
  end

  def get_link_data(urls) do
    urls 
      |> Enum.map(&fetch(&1))
      |> Enum.map(fn({_, data}) -> extract_title_and_url(data) end)
      |> Enum.filter(fn({reply, _}) -> reply == :ok end)
      |> Enum.map(fn({_, data}) -> data end)
  end

  def extract_title_and_url(%{"title" => title, "url" => url}) do
    { :ok, { title, url }}
  end

  def extract_title_and_url(data) do
    { :error, "no data" }
  end

  def fetch(url) do
    { _, res } = HTTPoison.get("#{@embedly}&url=#{url}")
      |> handle_response
    {:ok, res}
  end

  def handle_response({:ok, %{status_code: 200, body: body}}) do
    { :ok, :jsx.decode(body) }
  end

  def handle_response({:ok, %{status_code: _, body: body}}) do
    {:error, body}
  end

  def save_link({title, url}) do
    Query.table("links")
      |> Query.insert(%{ title: title, url: url })
      |> Repo.run
  end
end
