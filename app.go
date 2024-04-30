package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"regexp"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved,
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

type Meta struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Type        string `json:"type"`
	Url         string `json:"url"`
	Image       string `json:"image"`
	SiteName    string `json:"siteName"`
}

var titleRegex = regexp.MustCompile(`<title.*>(.*)</title>`)
var descriptionRegex = regexp.MustCompile(`<meta.*? name="description".*? content="(.*?)".*?>`)
var metaTypeRegex = regexp.MustCompile(`<meta.*? property="og:type".*? content="(.*?)".*?>`)
var imageRegex = regexp.MustCompile(`<meta.*? property="og:image".*? content="(.*?)".*?>`)
var siteNameRegex = regexp.MustCompile(`<meta.*? property="og:site_name".*? content="(.*?)".*?>`)

func (a *App) parseMeta(url string, body []byte) Meta {
	meta := Meta{
		Url: url,
	}

	if match := titleRegex.FindSubmatch(body); match != nil {
		meta.Title = string(match[1])
	}

	if match := descriptionRegex.FindSubmatch(body); match != nil {
		meta.Description = string(match[1])
	}

	if match := metaTypeRegex.FindSubmatch(body); match != nil {
		meta.Type = string(match[1])
	}

	if match := imageRegex.FindSubmatch(body); match != nil {
		meta.Image = string(match[1])
	}

	if match := siteNameRegex.FindSubmatch(body); match != nil {
		meta.SiteName = string(match[1])
	}

	return meta
}

// map to cache webpage meta
var cache = make(map[string]Meta)

func (a *App) FetchWebpageMetadata(url string) (Meta, error) {
	// Fetch from cache.
	if val, ok := cache[url]; ok {
		return val, nil
	}

	// Fetch fresh metadata.
	res, err := http.Get(url)
	if err != nil {
		fmt.Printf("FetchWebpageMetadata#http.Get: %v\n", err)
		cache[url] = Meta{
			Url: url,
		}

		return cache[url], err
	}

	content, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Printf("FetchWebpageMetadata#io.ReadAll: %v\n", err)
		cache[url] = Meta{
			Url: url,
		}

		return cache[url], err
	}

	if res.Body.Close() != nil {
		fmt.Printf("FetchWebpageMetadata#res.Body.Close: %v\n", err)
		cache[url] = Meta{
			Url: url,
		}

		return cache[url], err
	}

	meta := a.parseMeta(url, content)
	cache[url] = meta
	return meta, nil
}
