{%- macro renderMessages(messages) -%}
	{%- if messages -%}
		<div id="flash-messages" class="container">
			{%- for message in messages.info -%}
				{{ renderMessage(message, "info") }}
			{%- endfor -%}
			{%- for message in messages.success -%}
				{{ renderMessage(message, "success") }}
			{%- endfor -%}
			{%- for message in messages.warning -%}
				{{ renderMessage(message, "warning") }}
			{%- endfor -%}
			{%- for message in messages.error -%}
				{{ renderMessage(message, "danger") }}
			{%- endfor -%}
		</div>
	{%- endif -%}
{%- endmacro -%}

{%- macro renderMessage(message, type) -%}
	<div class="alert alert-{{ type }}">
		{%- if utils.isObject(message) -%}
			{%- if message.title -%}
				<h4>{{ message.title }}</h4>
			{%- endif -%}
			{%- if message.detail -%}
				<p>{{ message.detail }}</p>
			{%- endif -%}
			{%- if message.list -%}
				<ul>
					{%- for item in message.list -%}
						<li>{{ item }}</li>
					{%- endfor -%}
				</ul>
			{%- endif -%}
		{%- else -%}
			{{ message }}
		{%- endif -%}
	</div>
{%- endmacro -%}
