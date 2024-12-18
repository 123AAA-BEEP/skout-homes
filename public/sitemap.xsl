<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - SkoutHomes</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-size: 14px;
            color: #333;
            max-width: 75%;
            margin: 0 auto;
            padding: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          }
          th {
            background-color: #f4f4f4;
            text-align: left;
            padding: 12px;
            font-weight: bold;
            border-bottom: 2px solid #ddd;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            vertical-align: top;
          }
          tr:hover {
            background-color: #f9f9f9;
          }
          a {
            color: #0066cc;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .header {
            background-color: #fff;
            padding: 20px 0;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .stats {
            margin: 20px 0;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>SkoutHomes Sitemap</h1>
          <p>This is the sitemap for skouthomes.com, listing all publicly accessible URLs.</p>
        </div>
        <div class="stats">
          <p>
            <strong>Total URLs:</strong>
            <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
          </p>
          <p>
            <strong>Last Updated:</strong>
            <xsl:value-of select="substring(sitemap:urlset/sitemap:url[1]/sitemap:lastmod, 1, 10)"/>
          </p>
        </div>
        <table>
          <tr>
            <th>URL</th>
            <th>Priority</th>
            <th>Change Frequency</th>
            <th>Last Modified</th>
          </tr>
          <xsl:for-each select="sitemap:urlset/sitemap:url">
            <tr>
              <td>
                <a href="{sitemap:loc}">
                  <xsl:value-of select="sitemap:loc"/>
                </a>
              </td>
              <td><xsl:value-of select="sitemap:priority"/></td>
              <td><xsl:value-of select="sitemap:changefreq"/></td>
              <td><xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet> 